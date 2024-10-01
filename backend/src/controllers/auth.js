const logger = require('../util/logger');
const httpCodes = require('http-status-codes');

const authService = require('../services/auth');

module.exports = {
  async signup(req, res) {
    logger.info('controllers/auth.js | Entrando en la función signup()');

    const { email, password } = req.body;

    if (!email || !password) return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'No se ha proporcionado el email o la contraseña' });

    logger.debug(`controllers/auth.js | Email: ${email}`);
    logger.debug(`controllers/auth.js | Contraseña: ${password}`);

    try {
      const newUser = await authService.signup(email, password);
      return res.status(httpCodes.StatusCodes.CREATED).json(newUser);
    } catch (error) {
      logger.error(`controllers/auth.js | Error al registrar usuario con email ${email}`);
      logger.debug(`controllers/auth.js | Error: ${error.message}`);
      res.status(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Ha habido un problema al obtener el stock' });
    }
  },

  async login(req, res) {
    logger.info('controllers/auth.js | Entrando en la función login()');

    const { email, password } = req.body;

    if (!email || !password) return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'No se ha proporcionado el email o la contraseña' });

    logger.debug(`controllers/auth.js | Email: ${email}`);
    logger.debug(`controllers/auth.js | Contraseña: ${password}`);

    try {
      const user = await authService.login(email, password);
      logger.info(`controllers/auth.js | Usuario ${email} inició sesión con éxito`);
      return res.status(httpCodes.StatusCodes.OK).json(user);
    } catch (error) {
      logger.error('controllers/auth.js | Error al iniciar sesión');
      logger.debug(`controllers/auth.js | Error: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  },
};
