import axios from 'axios';
import { notifyOk, notifyError } from './dialogUtil';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const description = document.getElementById('description').value.trim();
            const year = document.getElementById('year').value.trim();

            if (!title || !author || !description || !year) {
                notifyError('Todos los campos son obligatorios.');
                return;
            }

            try {
                const response = await axios.post('http://localhost:8080/books', {
                    title,
                    author,
                    description,
                    year: parseInt(year, 10),
                });

                if (response.status === 201) {
                    notifyOk('Libro registrado correctamente.');
                    form.reset();
                } else {
                    notifyError('No se pudo registrar el libro. Intenta nuevamente.');
                }
            } catch (error) {
                console.error('Error al registrar el libro:', error);
                notifyError('Ocurrió un error al intentar registrar el libro.');
            }
        });
    }
});