import axios from 'axios';
import { notifyOk, notifyError } from './dialogUtil';

const params = new URLSearchParams(window.location.search);
const bookId = params.get('id');

if (!bookId) {
    notifyError('ID no válido.');
    window.location.href = 'index.html';
}

// Cargar datos del libro en el formulario
async function loadBookData() {
    try {
        const response = await axios.get(`http://localhost:8080/books`);
        const book = response.data.find(b => b.id === parseInt(bookId));
        if (!book) throw new Error('Libro no encontrado.');

        document.getElementById('title').value = book.title || '';
        document.getElementById('author').value = book.author || '';
        document.getElementById('description').value = book.description || '';
        document.getElementById('year').value = book.year || '';
    } catch (error) {
        console.error('Error al cargar el libro:', error);
        notifyError('No se pudo cargar la información del libro.');
        window.location.href = 'index.html';
    }
}

// Enviar datos actualizados
document.getElementById('edit-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
        const response = await axios.put(`http://localhost:8080/books/${bookId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status === 200) {
            notifyOk('Libro actualizado correctamente.');
            console.log('Respuesta exitosa:', response.data);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }        
    } catch (error) {
        console.error('Error al actualizar el libro:', error.response?.data || error);
        notifyError(error.response?.data?.error || 'Ocurrió un error al actualizar el libro.');
    }
});


loadBookData();