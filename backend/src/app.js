const express = require('express');
const cors = require('cors');
const knex = require('knex');

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

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/books', async (req, res) => {
    try {
        const books = await db('books').select('*');
        res.json(books);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        res.status(500).json({ error: 'Error al obtener los libros.' });
    }
});

app.post('/books', async (req, res) => {
    try {
        const { title, author, description, year } = req.body;

        if (!title || !author || !description || !year) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const newBook = { title, author, description, year };
        await db('books').insert(newBook);

        res.status(201).json({ message: 'Libro agregado correctamente.', book: newBook });
    } catch (error) {
        console.error('Error al agregar el libro:', error);
        res.status(500).json({ error: 'Error al agregar el libro.' });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, description, year } = req.body;

        const updatedBook = {};
        if (title) updatedBook.title = title;
        if (author) updatedBook.author = author;
        if (description) updatedBook.description = description;
        if (year) updatedBook.year = year;

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
