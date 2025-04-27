# Utilizamos una imagen oficial de Node.js
FROM node:20

# Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias primero
COPY package*.json ./

# Instalamos las dependencias
RUN npm install --include=dev && npm install -g mocha

# Copiamos el resto de archivos de la aplicación
COPY . .

# Exponemos el puerto que usa tu backend Express
EXPOSE 8080

# Comando que se ejecuta al iniciar el contenedor
CMD ["npm", "start"]
