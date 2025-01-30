const express = require('express');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: { filename: './books.db' },
    useNullAsDefault: true,
});

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// 📌 CRUD de libros
app.get('/books', async (req, res) => {
    try {
        const books = await db('books').select('*');
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los libros.' });
    }
});

app.post('/books', async (req, res) => {
    try {
        const { title, author_id } = req.body;

        if (!title || !author_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const newBook = {
            title: title.trim(),
            author_id: Number(author_id) // Asegurar que sea un número
        };

        const [id] = await db('books').insert(newBook);
        res.status(201).json({ message: 'Libro agregado correctamente.', book_id: id });
    } catch (error) {
        console.error('Error al agregar el libro:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { title, author_id } = req.body;
        const { id } = req.params;

        if (!title || !author_id) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // Convertir author_id a número
        const updatedBook = {
            title: title.trim(),
            author_id: Number(author_id)
        };

        // Verificar si el libro existe
        const bookExists = await db('books').where({ id }).first();
        if (!bookExists) {
            return res.status(404).json({ error: 'Libro no encontrado.' });
        }

        // Actualizar libro
        await db('books').where({ id }).update(updatedBook);
        res.json({ message: 'Libro actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        await db('books').where({ id: req.params.id }).del();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro.' });
    }
});

// 📌 CRUD de autores
app.get('/authors', async (req, res) => {
    try {
        const authors = await db('authors').select('*');
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los autores.' });
    }
});

app.post('/authors', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'El nombre del autor es obligatorio.' });
        }
        await db('authors').insert({ name });
        res.status(201).json({ message: 'Autor agregado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el autor.' });
    }
});

app.put('/authors/:id', async (req, res) => {
    try {
        const { name } = req.body;
        await db('authors').where({ id: req.params.id }).update({ name });
        res.json({ message: 'Autor actualizado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el autor.' });
    }
});

app.delete('/authors/:id', async (req, res) => {
    try {
        await db('authors').where({ id: req.params.id }).del();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el autor.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});