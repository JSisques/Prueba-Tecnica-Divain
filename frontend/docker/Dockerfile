# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación y el archivo de configuración
COPY . .
COPY .env.local ./.env.local

# Compila la aplicación de Next.js para producción
RUN npm run build
RUN npm prune --production

# Expone el puerto y define el comando por defecto
EXPOSE 3000
CMD ["npm", "start"]
