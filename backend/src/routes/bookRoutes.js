const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Rutas CRUD de libros

// Obtener todos los libros
router.get('/', bookController.getAllBooks);

// Obtener un libro por ID
router.get('/:id', bookController.getBookById);

// Crear un nuevo libro
router.post('/', bookController.createBook);

// Actualizar un libro existente
router.put('/:id', bookController.updateBook);

// Eliminar un libro
router.delete('/:id', bookController.deleteBook);

module.exports = router;