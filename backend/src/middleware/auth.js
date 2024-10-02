const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/authConfig');
const logger = require('../util/logger');

const httpCodes = require('http-status-codes');

exports.verifyToken = (req, res, next) => {
  logger.info(`middleware/auth.js | Entrando en la función verifyToken()`);

  // Obtenemos el token del encabezado 'Authorization'
  const authHeader = req.headers['authorization'];

  // Comprobamos si contiene el token
  if (!authHeader) {
    logger.warn('middleware/auth.js | No se ha proporcionado el token de autenticación');
    return res.status(httpCodes.StatusCodes.UNAUTHORIZED).json({ error: 'No se ha proporcionado el token de autenticación' });
  }

  // Extraemos el token del formato Bearer token
  const token = authHeader.split(' ')[1];

  // Comprobamos si contiene el token
  if (!token) {
    logger.warn('middleware/auth.js | No se ha proporcionado el token de autenticación');
    return res.status(httpCodes.StatusCodes.UNAUTHORIZED).json({ error: 'No se ha proporcionado el token de autenticación' });
  }

  // Verificamos el token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      logger.warn('middleware/auth.js | Fallo al autenticar el token');
      return res.status(httpCodes.StatusCodes.FORBIDDEN).json({ error: 'Fallo al autenticar el token' });
    }

    // Añadimos la información del usuario al objeto de solicitud
    req.user = decoded;
    logger.info(`middleware/auth.js | Token validado`);

    next();
  });
};
