require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const swaggerMiddleware = require('./src/config/swaggerConfig');

const app = express();

var cors = require('cors');

// CORS
app.use(cors());
app.use(bodyParser.json());

// Swagger
swaggerMiddleware(app);

// Constante para la ruta de la API
const apiRootPath = process.env.API_PATH || '/api/v1';

// Routes
const authRoutes = require('./src/routes/auth');
const stockRoutes = require('./src/routes/stock');
const movementHistoryRoutes = require('./src/routes/movementHistory');

app.use(`${apiRootPath}/auth`, authRoutes);
app.use(`${apiRootPath}`, stockRoutes);
app.use(`${apiRootPath}`, movementHistoryRoutes);

module.exports = app;
