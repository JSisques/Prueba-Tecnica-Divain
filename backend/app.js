require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var cors = require('cors');

// CORS
app.use(cors());
app.use(bodyParser.json());

// Constante para la ruta de la API
const apiRootPath = process.env.API_PATH || '/api/v1';

// Routes
const stockRoutes = require('./src/routes/stock');

app.use(`${apiRootPath}`, stockRoutes);

module.exports = app;
