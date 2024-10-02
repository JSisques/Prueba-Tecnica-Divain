# Usamos una imagen oficial de Node.js
FROM node:20.17

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos el archivo package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código de la aplicación al contenedor
COPY . .

# Exponemos el puerto
EXPOSE 4224

# Iniciamos el contenedor
CMD ["sh", "-c", "npm run prisma:generate && npm run prisma:migrate && npm run database:populate && npm start"]
