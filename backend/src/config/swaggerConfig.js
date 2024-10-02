const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Definición básica de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Prueba técnica Divain',
    version: '1.0.0',
    description: 'Documentación del backend de la prueba técnica',
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ BearerAuth: [] }],
};

// Opciones para la configuración de Swagger
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*js')],
};

// Inicializamos swagger-jsdoc con las opciones proporcionadas
const swaggerSpec = swaggerJSDoc(options);

const swaggerMiddleware = app => {
  // Servimos la documentación de Swagger en la ruta '/api-docs'
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerMiddleware;
