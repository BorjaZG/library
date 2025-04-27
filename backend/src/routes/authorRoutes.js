const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Rutas CRUD de autores

// Obtener todos los autores
router.get('/', authorController.getAllAuthors);

// Obtener un autor por ID
router.get('/:id', authorController.getAuthorById);

// Crear un nuevo autor
router.post('/', authorController.createAuthor);

// Actualizar un autor existente
router.put('/:id', authorController.updateAuthor);

// Eliminar un autor
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;