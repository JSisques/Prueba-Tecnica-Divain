const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Rutas de autenticación de usuarios
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       400:
 *         description: Solicitud inválida (por ejemplo, email ya en uso)
 */
router.post('/signup', authController.signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve un token de autenticación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciales incorrectas
 *       400:
 *         description: Solicitud inválida (por ejemplo, falta el email o la contraseña)
 */
router.post('/login', authController.login);

module.exports = router;
