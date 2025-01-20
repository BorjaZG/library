import axios from 'axios';
import { notifyOk, notifyError } from './dialogUtil';

window.addBook = async function () {
    const form = document.getElementById('book-form');
    const formData = new FormData(form);

    try {
        const response = await axios.post('http://localhost:8080/books', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.status === 201) {
            notifyOk('Libro registrado correctamente.');
            form.reset();
        }
    } catch (error) {
        console.error('Error al registrar el libro:', error.response?.data || error);
        notifyError('Ocurrió un error al registrar el libro.');
    }
};