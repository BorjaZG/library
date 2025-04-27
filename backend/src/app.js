const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

module.exports = app;