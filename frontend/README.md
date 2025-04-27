
# 📚 Library Management API

## Descripción
Este proyecto es una API RESTful de gestión de libros y autores. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre libros y autores almacenados en una base de datos MariaDB.

Incluye además un conjunto completo de tests unitarios y de integración para garantizar su correcto funcionamiento.

## Características
- CRUD completo de **libros** (`/api/books`) y **autores** (`/api/authors`).
- Backend desarrollado con **Node.js** y **Express**.
- Base de datos **MariaDB** conectada mediante **mysql2**.
- Tests unitarios y de integración usando **Mocha**, **Chai** y **Chai-HTTP**.
- Variables de entorno configurables mediante **dotenv**.

## Tecnologías utilizadas
- **Node.js** (runtime)
- **Express** (framework backend)
- **MariaDB** (base de datos relacional)
- **mysql2** (driver para Node.js)
- **Mocha** (framework de testing)
- **Chai** (librería de aserciones)
- **Chai-HTTP** (extensión para testear APIs REST)

## Requisitos previos
Antes de ejecutar el proyecto debes tener instalado:
- [Node.js](https://nodejs.org/)
- [MariaDB](https://mariadb.org/)

Además, asegúrate de tener un servidor MariaDB corriendo en tu máquina (por defecto en el puerto 3306 o el que configures).

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repo>
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto y añade:

   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_DATABASE=books
   PORT=3000
   ```

4. Crea la base de datos y las tablas en MariaDB:

   ```sql
   CREATE DATABASE books;

   USE books;

   CREATE TABLE authors (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL
   );

   CREATE TABLE books (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     author VARCHAR(255) NOT NULL
   );
   ```

5. Inicia el servidor:
   ```bash
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:3000`.

## Scripts disponibles

- `npm start`: Ejecuta el servidor normalmente.
- `npm run dev`: Ejecuta el servidor en modo desarrollo con Nodemon.
- `npm test`: Lanza todos los tests unitarios e integración.

## Rutas de la API

### 📚 Books
- **GET** `/api/books` - Listar todos los libros.
- **POST** `/api/books` - Crear un libro.
- **GET** `/api/books/:id` - Obtener un libro específico.
- **PUT** `/api/books/:id` - Actualizar un libro.
- **DELETE** `/api/books/:id` - Eliminar un libro.

### ✍️ Authors
- **GET** `/api/authors` - Listar todos los autores.
- **POST** `/api/authors` - Crear un autor.
- **GET** `/api/authors/:id` - Obtener un autor específico.
- **PUT** `/api/authors/:id` - Actualizar un autor.
- **DELETE** `/api/authors/:id` - Eliminar un autor.

## Estructura del proyecto
```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authorController.js
│   │   └── bookController.js
│   ├── routes/
│   │   ├── authorRoutes.js
│   │   └── bookRoutes.js
│   ├── services/
│   │   ├── authorService.js
│   │   └── bookService.js
│   ├── tests/
│   │   ├── unit/
│   │   │   ├── authorController.test.js
│   │   │   └── bookController.test.js
│   │   └── integration/
│   │       ├── authorRoutes.test.js
│   │       └── bookRoutes.test.js
│   ├── app.js
│   └── server.js
├── package.json
├── .env
└── README.md
```
