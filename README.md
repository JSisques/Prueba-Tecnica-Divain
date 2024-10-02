# Prueba-Tecnica-Divain

## Introducción

Este proyecto es una plataforma de gestión de stock que permite a los usuarios registrar entradas y salidas de productos, visualizar el historial de movimientos y administrar los productos en inventario. Está compuesto por un frontend desarrollado con React y Next.js, y un backend basado en Node.js y Express.

## Frontend

### Tecnologías

El frontend está desarrollado utilizando:

- **React:** Para la construcción de la interfaz de usuario.
- **Next.js:** Para la generación del servidor del frontend y manejo de la autenticación.

### Páginas Principales

1. Sign In (`/api/auth/signin`):
   Página de inicio de sesión donde los usuarios pueden ingresar con sus credenciales.

2. Sign Up (`/auth/signup`):
   Página de registro para crear una nueva cuenta en la plataforma.

3. Home (/):
   Página principal donde se muestran las operaciones del stock, incluyendo la capacidad de modificar cantidades y registrar movimientos de entrada o salida.

### Guía de Uso

1. Registro de Usuario

- Visita la ruta `/auth/signup` para registrar un nuevo usuario. Completa el formulario con un email y contraseña.

2. Inicio de Sesión

- Después de registrar al usuario, accede a la ruta `/api/auth/signin` para iniciar sesión.

3. Pantalla Principal

- Una vez logueado, serás redirigido a la pantalla principal que muestra el listado de stock.
- En la columna "Sumar o restar cantidad", puedes ajustar la cantidad de stock sumando o restando la cantidad original.
- Al final de la página, podrás ver un listado con el historial de movimientos.

### Puertos

El frontend se ejecuta en el puerto 8080, lo cual permite acceder a la interfaz de usuario mediante http://localhost:8080.

### Instalación y Ejecución del Frontend

Para ejecutar el frontend, sigue estos pasos:

1. Navega al directorio del frontend:

```bash
cd frontend
```

2. Instala las dependencias:

```bash
npm install
```

3. Genera los archivos de producción:

```bash
npm run build
```

4. Inicia el servidor del frontend:

```bash
npm run start
```

El frontend estará disponible en http://localhost:8080.

## Backend

### Tecnologías

El backend está construido con:

- **Node.js:** Para ejecutar el servidor.
- **Express**: Para el manejo de rutas y controladores.
- **SQLite**: Base de datos usada para almacenar la información de stock y movimientos.

### Rutas

1. Autenticación

- `/auth/signup`: Ruta para registrar nuevos usuarios.
- `/auth/signin`: Ruta para iniciar sesión y obtener un token de autenticación.

2. Stock

- `/api/v1/stock`: Permite obtener la lista de productos en stock y actualizar la cantidad de un producto.

3. Movement History

- `/api/v1/movementHistory`: Permite obtener el historial de movimientos de stock, así como registrar nuevas entradas o salidas.

### Puertos

El backend se ejecuta en el puerto 4224 bajo la ruta `/api/v1`.

### Documentación API

El backend cuenta con una documentación detallada de las rutas y los endpoints disponibles, accesible a través de Swagger en la ruta:

- [http://localhost:4224/docs](http://localhost:4224/docs)

### Instalación y Ejecución del Backend

Para ejecutar el backend, sigue estos pasos:

1. Navega al directorio del backend:

```bash
cd backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicializa Prisma:

```bash
npm run prisma:init
```

4. Genera el cliente Prisma:

```bash
npm run prisma:generate
```

5. Aplica las migraciones a la base de datos:

```bash
npm run prisma:migrate
```

6. Llena la base de datos con datos iniciales:

```bash
npm run database:populate
```

7. Inicia el servidor del backend:

```bash
npm run start
```

El backend estará disponible en http://localhost:4224/api/v1.
