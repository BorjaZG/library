import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080/api";

export default function CRUDApp() {
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [newBook, setNewBook] = useState({ title: "", author_id: "" });
    const [newAuthor, setNewAuthor] = useState({ name: "" });
    const [editingBook, setEditingBook] = useState(null);
    const [editingAuthor, setEditingAuthor] = useState(null);

    useEffect(() => {
        fetchBooks();
        fetchAuthors();
    }, []);

    const fetchBooks = async () => {
        const res = await fetch(`${API_URL}/books`);
        const data = await res.json();
        setBooks(data);
    };

    const fetchAuthors = async () => {
        const res = await fetch(`${API_URL}/authors`);
        const data = await res.json();
        setAuthors(data);
    };

    // 📌 Agregar o actualizar un libro
    const handleBookSubmit = async () => {
        if (!newBook.title || !newBook.author_id) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const bookData = {
            title: newBook.title.trim(),
            author_id: parseInt(newBook.author_id, 10)
        };

        if (editingBook) {
            console.log("Actualizando libro con ID:", editingBook.id, bookData);

            const res = await fetch(`${API_URL}/books/${editingBook.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error al actualizar libro:", errorData);
                alert("Error al actualizar el libro: " + errorData.error);
                return;
            }

            setEditingBook(null);
        } else {
            console.log("Agregando nuevo libro:", bookData);

            const res = await fetch(`${API_URL}/books`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error al agregar libro:", errorData);
                alert("Error al agregar el libro: " + errorData.error);
                return;
            }
        }

        setNewBook({ title: "", author_id: "" });
        fetchBooks();
    };

    const editBook = (book) => {
        setEditingBook(book);
        setNewBook({ title: book.title, author_id: book.author_id });
    };

    const deleteBook = async (id) => {
        await fetch(`${API_URL}/books/${id}`, { method: "DELETE" });
        fetchBooks();
    };

    // 📌 Agregar o actualizar un autor
    const handleAuthorSubmit = async () => {
        if (!newAuthor.name) {
            alert("El nombre del autor es obligatorio.");
            return;
        }

        if (editingAuthor) {
            console.log("Actualizando autor con ID:", editingAuthor.id, newAuthor);

            const res = await fetch(`${API_URL}/authors/${editingAuthor.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAuthor),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error al actualizar autor:", errorData);
                alert("Error al actualizar el autor: " + errorData.error);
                return;
            }

            setEditingAuthor(null);
        } else {
            console.log("Agregando nuevo autor:", newAuthor);

            const res = await fetch(`${API_URL}/authors`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAuthor),
            });

            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error al agregar autor:", errorData);
                alert("Error al agregar el autor: " + errorData.error);
                return;
            }
        }

        setNewAuthor({ name: "" });
        fetchAuthors();
    };

    const editAuthor = (author) => {
        setEditingAuthor(author);
        setNewAuthor({ name: author.name });
    };

    const deleteAuthor = async (id) => {
        await fetch(`${API_URL}/authors/${id}`, { method: "DELETE" });
        fetchAuthors();
    };

    return (
        <div className="container mt-4">
            <h1 className="text-white text-center bg-primary p-3 rounded">📚 La Librería Noctámbula 📚</h1>

            {/* Sección de Libros */}
            <div className="card p-4 mb-4">
                <h2 className="text-secondary">📖 Libros</h2>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        placeholder="Título del libro"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    />
                    <select
                        className="form-select"
                        value={newBook.author_id}
                        onChange={(e) => setNewBook({ ...newBook, author_id: e.target.value })}
                    >
                        <option value="">Seleccionar autor</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>

                    <button className={`btn ${editingBook ? "btn-primary" : "btn-success"}`} onClick={handleBookSubmit}>
                        {editingBook ? "Actualizar" : "Agregar"}
                    </button>
                </div>

                <ul className="list-group">
                    {books.map((book) => (
                        <li key={book.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {book.title} (Autor: {authors.find(a => a.id === book.author_id)?.name || "Desconocido"})
                            <div>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => editBook(book)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteBook(book.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sección de Autores */}
            <div className="card p-4">
                <h2 className="text-secondary">👤 Autores</h2>
                <div className="input-group mb-3">
                    <input
                        className="form-control"
                        placeholder="Nombre del autor"
                        value={newAuthor.name}
                        onChange={(e) => setNewAuthor({ name: e.target.value })}
                    />
                    <button className={`btn ${editingAuthor ? "btn-primary" : "btn-success"}`} onClick={handleAuthorSubmit}>
                        {editingAuthor ? "Actualizar" : "Agregar"}
                    </button>
                </div>

                <ul className="list-group">
                    {authors.map((author) => (
                        <li key={author.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {author.name}
                            <div>
                                <button className="btn btn-warning btn-sm me-2" onClick={() => editAuthor(author)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteAuthor(author.id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}