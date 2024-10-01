const bcrypt = require('bcryptjs');
const tokenManager = require('../util/tokenManager');
const logger = require('../util/logger');

const prisma = require('../util/prisma');

module.exports = {
  async signup(email, password) {
    logger.info('services/auth.js | Entrando en la función signup()');

    // Verificamos si ya existe un usuario con este email
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('El usuario ya existe en la base de datos');
    }

    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  },

  async login(email, password) {
    logger.info('services/auth.js | Entrando en la función login()');

    // Buscamos al usuario por email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Usuario no encontrado');

    // Comparamos la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Credenciales inválidas');

    // Creamos un token JWT
    const token = tokenManager.generateToken(user);
    logger.debug(`services/auth.js | Token para el usuario ${email}: ${token}`);

    // Devolvemos los detalles del usuario junto con el token
    return {
      id: user.id,
      email: user.email,
      token: token,
    };
  },
};
