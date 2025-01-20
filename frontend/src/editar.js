import axios from 'axios';
import { notifyOk, notifyError } from './dialogUtil';

window.loadBookDetails = async function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    if (!bookId) {
        notifyError('No se proporcionó un ID de libro válido.');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:8080/books/${bookId}`);
        const book = response.data;

        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('description').value = book.description;
        document.getElementById('year').value = book.year;
    } catch (error) {
        console.error('Error al cargar los detalles del libro:', error);
        notifyError('No se pudieron cargar los detalles del libro.');
    }
};

window.updateBook = async function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('id');

    if (!bookId) {
        notifyError('No se proporcionó un ID de libro válido.');
        return;
    }

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const description = document.getElementById('description').value;
    const year = document.getElementById('year').value;

    if (!title || !author || !description || !year) {
        notifyError('Todos los campos son obligatorios.');
        return;
    }

    try {
        const response = await axios.put(`http://localhost:8080/books/${bookId}`, {
            title,
            author,
            description,
            year,
        });

        if (response.status === 200) {
            notifyOk('Libro actualizado correctamente.');
            window.location.href = 'index.html';
        } else {
            notifyError('No se pudo actualizar el libro. Intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        notifyError('Ocurrió un error al intentar actualizar el libro.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.loadBookDetails();

    const form = document.getElementById('edit-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            window.updateBook();
        });
    }
});