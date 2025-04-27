const pool = require('../config/database');

// Obtener todos los autores
exports.getAllAuthors = async () => {
    const [rows] = await pool.query('SELECT * FROM authors');
    return rows;
};

// Obtener un autor por ID
exports.getAuthorById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM authors WHERE id = ?', [id]);
    return rows[0]; // Primer autor encontrado
};

// Crear un nuevo autor
exports.createAuthor = async ({ name }) => {
    const [result] = await pool.query('INSERT INTO authors (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
};

// Actualizar un autor
exports.updateAuthor = async (id, { name }) => {
    const [result] = await pool.query(
        'UPDATE authors SET name = ? WHERE id = ?',
        [name, id]
    );

    if (result.affectedRows === 0) {
        return null; // No se encontró el autor
    }

    return { id, name };
};

// Eliminar un autor
exports.deleteAuthor = async (id) => {
    const [result] = await pool.query('DELETE FROM authors WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
        return null; // No se encontró el autor
    }

    return true;
};