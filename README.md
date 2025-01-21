# Library Management System

## Descripción
Este proyecto es un sistema de gestión de libros que permite realizar operaciones básicas de un CRUD (Crear, Leer, Actualizar, Eliminar) tanto en el backend como en el frontend. La aplicación incluye una API REST para gestionar los datos de los libros almacenados en una base de datos SQLite y una interfaz web desarrollada con HTML, CSS y JavaScript.

## Características
- CRUD completo para gestionar libros.
- Backend desarrollado con Node.js y Express.
- Base de datos SQLite.
- Frontend responsivo utilizando Bootstrap.
- Validaciones básicas en el frontend y backend.
- Notificaciones de éxito y error mediante Toastify.js.

## Tecnologías utilizadas
### Backend
- Node.js
- Express
- SQLite
- Knex.js (ORM para gestionar la base de datos)

### Frontend
- HTML5
- CSS3 (Bootstrap)
- JavaScript (ES6+)
- Toastify.js (para notificaciones)

## Requisitos previos
Antes de ejecutar el proyecto, asegúrate de tener instalado:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

## Instrucciones para ejecutar el proyecto
### Clonar el repositorio
```bash
git clone https://github.com/BorjaZG/library.git
cd library
```

### Configuración del backend
1. Instala las dependencias del backend:
   ```bash
   npm install
   ```
2. Inicia la base de datos SQLite (si no existe, se creará automáticamente al iniciar el servidor).
3. Ejecuta el servidor backend:
   ```bash
   node app.js
   ```
   El servidor estará disponible en `http://localhost:8080`.

### Configuración del frontend
1. Abre el archivo `index.html` en un navegador web o utiliza una extensión como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code para una experiencia más fluida.

## Rutas de la API
### Libros
- **GET /books**: Devuelve la lista de libros.
- **POST /books**: Crea un nuevo libro.
  - Parámetros:
    ```json
    {
      "title": "string",
      "author": "string",
      "description": "string",
      "year": "number"
    }
    ```
- **PUT /books/:id**: Actualiza un libro existente.
  - Parámetros (en el cuerpo):
    ```json
    {
      "title": "string",
      "author": "string",
      "description": "string",
      "year": "number"
    }
    ```
- **DELETE /books/:id**: Elimina un libro por su ID.

## Estructura del proyecto
```
.
├── app.js            # Backend principal (servidor Express)
├── books.db          # Base de datos SQLite
├── dialogUtil.js     # Utilidades para notificaciones (Toastify.js)
├── editar.html       # Página para editar libros
├── editar.js         # Lógica de la edición de libros
├── index.html        # Página principal para listar libros
├── index.js          # Lógica para listar y eliminar libros
├── index.css         # Estilos de la página principal
├── registro.html     # Página para registrar nuevos libros
├── registro.js       # Lógica para registrar libros
├── registro.css      # Estilos para el formulario de registro
└── README.md         # Documentación del proyecto
```
