# Prueba-Tecnica-Divain

## Introducción

Este proyecto es una plataforma de gestión de stock que permite a los usuarios registrar entradas y salidas de productos, visualizar el historial de movimientos y administrar los productos en inventario. Está compuesto por un frontend desarrollado con **React** y **Next.js**, y un backend basado en **Node.js** y **Express**. El proyecto se ejecuta utilizando **Docker Compose**, lo que facilita su despliegue y configuración.

## Frontend

### Tecnologías

El frontend está desarrollado utilizando:

- **React**: Para la construcción de la interfaz de usuario.
- **Next.js**: Para la generación del servidor del frontend y manejo de la autenticación.

### Páginas Principales

1. **Sign In** (`/signin`):
   - Página de inicio de sesión donde los usuarios pueden ingresar con sus credenciales.
2. **Sign Up** (`/signup`):
   - Página de registro para crear una nueva cuenta en la plataforma.
3. **Home** (`/home`):
   - Página principal donde se muestran las operaciones del stock, incluyendo la capacidad de modificar cantidades, ver detalles de productos y registrar movimientos de entrada o salida.

### Guía de Uso

1. Registro de Usuario

- Visita la ruta `/auth/signup` para registrar un nuevo usuario. Completa el formulario con un email y contraseña.

2. Inicio de Sesión

- Después de registrar al usuario, accede a la ruta `/api/auth/signin` para iniciar sesión.

3. Pantalla Principal

- Una vez logueado, serás redirigido a la pantalla principal que muestra el listado de stock.
- En la columna "Modificar Stock", puedes ajustar la cantidad de stock sumando o restando la cantidad original.
- Al final de la página, podrás ver un listado con el historial de movimientos.

### Puertos

El frontend se ejecuta en el puerto **3000**, lo cual permite acceder a la interfaz de usuario mediante `http://localhost:3000`.

## Backend

### Tecnologías

El backend está construido con:

- **Node.js**: Para ejecutar el servidor.
- **Express**: Para el manejo de rutas y controladores.
- **SQLite**: Base de datos usada para almacenar la información de stock y movimientos.

### Rutas

1. **Autenticación**

   - `/auth/signup`: Ruta para registrar nuevos usuarios.
   - `/auth/signin`: Ruta para iniciar sesión y obtener un token de autenticación.

2. **Stock**

   - `/api/v1/stock`: Permite obtener la lista de productos en stock y actualizar la cantidad de un producto.

3. **Movement History**
   - `/api/v1/movementHistory`: Permite obtener el historial de movimientos de stock, así como registrar nuevas entradas o salidas.

### Documentación API

El backend cuenta con una documentación detallada de las rutas y los endpoints disponibles, accesible a través de Swagger en la ruta:

- `http://localhost:4224/docs`

### Puertos

El backend se ejecuta en el puerto **4224** bajo la ruta `/api/v1`.

## Instalación y Ejecución

### Requisitos Previos

- **Docker**: Asegúrate de tener Docker y Docker Compose instalados en tu máquina.

### Pasos

1. Clona el repositorio del proyecto:

```bash
   git clone https://github.com/JSisques/Prueba-Tecnica-Divain.git
```

2. Navega al directorio del proyecto:

```bash
cd proyecto-stock
```

3. Ejecuta el proyecto con Docker Compose:

```bash
docker-compose up -d
```

Esto lanzará tanto el frontend como el backend, que serán accesibles en los siguientes puertos:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4224/api/v1
- **Swagger Docs:** http://localhost:4224/docs

npx prisma init

npx prisma migrate dev --name init_db
npx prisma generate
d

docs en la ruta /docs
