const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const knex = require('knex');
const fs = require('fs');

// Configuración de la base de datos
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './books.db',
    },
    useNullAsDefault: true,
});

const app = express();
const PORT = 8080;

// Crear carpeta 'uploads' si no existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Rutas
app.get('/books', async (req, res) => {
    try {
        const books = await db('books').select('*');
        const booksWithImages = books.map(book => ({
            ...book,
            image: book.image ? `http://localhost:${PORT}${book.image}` : null,
        }));
        res.json(booksWithImages);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        res.status(500).json({ error: 'Error al obtener los libros.' });
    }
});

app.post('/books', upload.single('image'), async (req, res) => {
    try {
        const { title, author, description, year } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        if (!title || !author || !description || !year) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const newBook = { title, author, description, year, image: imagePath };
        await db('books').insert(newBook);

        res.status(201).json({ message: 'Libro agregado correctamente.', book: newBook });
    } catch (error) {
        console.error('Error al agregar el libro:', error);
        res.status(500).json({ error: 'Error al agregar el libro.' });
    }
});

app.put('/books/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, description, year } = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        const updatedBook = {};
        if (title) updatedBook.title = title;
        if (author) updatedBook.author = author;
        if (description) updatedBook.description = description;
        if (year) updatedBook.year = year;
        if (imagePath) updatedBook.image = imagePath;

        if (Object.keys(updatedBook).length === 0) {
            return res.status(400).json({ error: 'No se proporcionaron campos para actualizar.' });
        }

        const updatedRows = await db('books').where({ id }).update(updatedBook);

        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Libro no encontrado.' });
        }

        res.status(200).json({ message: 'Libro actualizado correctamente.', book: updatedBook });
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        res.status(500).json({ error: 'Error al actualizar el libro.' });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Verifica si el libro existe
        const book = await db('books').where({ id }).first();
        if (!book) {
            return res.status(404).json({ error: 'Libro no encontrado.' });
        }
        // Elimina el libro de la base de datos
        await db('books').where({ id }).del();
        // Si hay una imagen asociada, elimínala del sistema de archivos
        if (book.image) {
            const imagePath = path.join(__dirname, book.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        res.status(204).send(); // Respuesta exitosa sin contenido
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({ error: 'Error al eliminar el libro.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
