const pool = require('../config/database');

// Obtener todos los libros
exports.getAllBooks = async () => {
    const [rows] = await pool.query('SELECT * FROM books');
    return rows;
};

// Obtener un libro por ID
exports.getBookById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
};

// Crear un nuevo libro
exports.createBook = async (bookData) => {
    const { title, author_id } = bookData;
    const [result] = await pool.query(
        'INSERT INTO books (title, author_id) VALUES (?, ?)',
        [title, author_id]
    );
    return { id: result.insertId, title, author_id };
};

// Actualizar un libro existente
exports.updateBook = async (id, bookData) => {
    const { title, author_id } = bookData;
    const [result] = await pool.query(
        'UPDATE books SET title = ?, author_id = ? WHERE id = ?',
        [title, author_id, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }

    return { id, title, author_id };
};

// Eliminar un libro
exports.deleteBook = async (id) => {
    const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
        return null;
    }

    return true;
};