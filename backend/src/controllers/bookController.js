const bookService = require('../services/bookService');

// Obtener todos los libros
exports.getAllBooks = async (req, res) => {
    const books = await bookService.getAllBooks();
    res.json(books);
};

// Obtener un libro por ID
exports.getBookById = async (req, res) => {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(book);
};

// Crear un nuevo libro
exports.createBook = async (req, res) => {
    const { title, author_id } = req.body;
    if (!title || !author_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const newBook = await bookService.createBook({ title, author_id });
    res.status(201).json(newBook);
};

// Actualizar un libro
exports.updateBook = async (req, res) => {
    const { title, author_id } = req.body;
    if (!title || !author_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    const updatedBook = await bookService.updateBook(req.params.id, { title, author_id });
    if (!updatedBook) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.json(updatedBook);
};

// Eliminar un libro
exports.deleteBook = async (req, res) => {
    const deleted = await bookService.deleteBook(req.params.id);
    if (!deleted) {
        return res.status(404).json({ error: 'Libro no encontrado' });
    }
    res.status(204).send();
};