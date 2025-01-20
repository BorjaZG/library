import axios from 'axios';
import { notifyOk, notifyError } from './dialogUtil';

window.readBooks = async function () {
    try {
        const container = document.getElementById('cards-container');
        if (!container) {
            console.error('No se encontró el contenedor con id="cards-container".');
            return;
        }
        const response = await axios.get('http://localhost:8080/books');
        const books = response.data;
        container.innerHTML = ''; // Limpia el contenedor
        if (books.length === 0) {
            container.innerHTML = '<p class="text-muted">No hay libros registrados.</p>';
            return;
        }
        container.innerHTML = books.map(book => `
            <div class="card shadow-sm m-2" style="width: 18rem;" id="card-${book.id}">
                <img src="${book.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text"><strong>Autor:</strong> ${book.author}</p>
                    <p class="card-text"><strong>Año:</strong> ${book.year}</p>
                    <p class="card-text">${book.description}</p>
                    <a href="./editar.html?id=${book.id}" class="btn btn-primary">Editar</a>
                    <button class="btn btn-danger" onclick="deleteBook(${book.id})">Eliminar</button>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error al cargar los libros:', error);
        const container = document.getElementById('cards-container');
        if (container) {
            container.innerHTML = '<p class="text-danger">No se pudieron cargar los libros. Intenta nuevamente más tarde.</p>';
        }
        notifyError('Error al cargar los libros.');
    }
};

window.deleteBook = async function (bookId) {
    try {
        const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este libro?');
        if (!confirmDelete) {
            return; // Cancelar la acción si el usuario presiona "Cancelar"
        }
        // Realiza la solicitud DELETE al backend
        const response = await axios.delete(`http://localhost:8080/books/${bookId}`);
        if (response.status === 204) {
            // Eliminar la tarjeta del DOM
            const card = document.getElementById(`card-${bookId}`);
            if (card) {
                card.remove();
            }
            notifyOk('Libro eliminado correctamente.');
        } else {
            notifyError('No se pudo eliminar el libro. Intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        notifyError('Ocurrió un error al intentar eliminar el libro.');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.readBooks();
});