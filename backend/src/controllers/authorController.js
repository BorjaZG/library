const authorService = require('../services/authorService');

// Obtener todos los autores
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await authorService.getAllAuthors();
        res.json(authors);
    } catch (error) {
        console.error('Error al obtener autores:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Obtener un autor por ID
exports.getAuthorById = async (req, res) => {
    try {
        const author = await authorService.getAuthorById(req.params.id);

        if (!author) {
            return res.status(404).json({ error: 'Autor no encontrado.' });
        }

        res.json(author);
    } catch (error) {
        console.error('Error al obtener autor:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Crear un nuevo autor
exports.createAuthor = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'El nombre es obligatorio.' });
        }

        const newAuthor = await authorService.createAuthor({ name });
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error('Error al crear autor:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Actualizar un autor
exports.updateAuthor = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedAuthor = await authorService.updateAuthor(req.params.id, { name });

        if (!updatedAuthor) {
            return res.status(404).json({ error: 'Autor no encontrado.' });
        }

        res.json(updatedAuthor);
    } catch (error) {
        console.error('Error al actualizar autor:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

// Eliminar un autor
exports.deleteAuthor = async (req, res) => {
    try {
        const deleted = await authorService.deleteAuthor(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Autor no encontrado.' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar autor:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};