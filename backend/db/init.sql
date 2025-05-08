-- Permitir conexiones desde cualquier host para root
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root';
FLUSH PRIVILEGES;

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS books;
USE books;

-- Crear tabla de autores
CREATE TABLE IF NOT EXISTS authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Crear tabla de libros
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE SET NULL
);

-- Insertar autores
INSERT INTO authors (name) VALUES
('J.K. Rowling'),
('George Orwell'),
('Gabriel García Márquez'),
('Jane Austen');

-- Insertar libros
INSERT INTO books (title, author_id) VALUES
('Harry Potter y la piedra filosofal', 1),
('1984', 2),
('Cien años de soledad', 3),
('Orgullo y prejuicio', 4);