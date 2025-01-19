// Cargo las Librerias
const express = require('express');
const cors = require('cors');
const knex = require('knex');

//Inicio la App
const app = express();
app.use(cors());
app.use(express.json());

//Inicio la DB
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'books.db'
    },
    useNullAsDefault: true
});

app.get('/books', async (req, res) => {
    const books = await db('books').select('*');
    res.status(200).json(books);
});

app.get('/books/:title', async (req, res) => {
    const books = await db('books').select('*').where({ title: req.params.title });
    res.status(200).json(books);
});

app.post('/books', async (req, res) => {
    await db('books').insert({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        year: req.body.year
    });
    res.status(201).json({});
});

app.put('/books:title', (req, res) => {
    
});

app.delete('/books:title', (req, res) => {

});

app.listen(8080, () => {
    console.log('El backend ha iniciado en el puerto 8080');
});