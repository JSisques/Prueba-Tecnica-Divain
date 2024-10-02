const express = require('express');
const movementHistoryController = require('../controllers/movementHistory');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movement History
 *   description: Operaciones relacionadas con el historial de movimientos de productos
 */

/**
 * @swagger
 * /api/v1/movementHistory:
 *   get:
 *     summary: Obtener el historial completo de movimientos de stock
 *     tags: [Movement History]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista del historial de movimientos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MovementHistory'
 *       401:
 *         description: No autorizado, se requiere token JWT válido.
 */
router.get('/movementHistory', authMiddleware.verifyToken, movementHistoryController.getMovementHistory);

/**
 * @swagger
 * /api/v1/movementHistory/{sku}:
 *   get:
 *     summary: Obtener historial de movimientos por SKU
 *     tags: [Movement History]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sku
 *         schema:
 *           type: string
 *         required: true
 *         description: SKU del producto
 *     responses:
 *       200:
 *         description: Historial de movimientos para el producto especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MovementHistory'
 *       404:
 *         description: Historial no encontrado para el SKU especificado
 *       401:
 *         description: No autorizado, se requiere token JWT válido.
 */
router.get('/movementHistory/:sku', authMiddleware.verifyToken, movementHistoryController.getMovementHistoryBySku);

/**
 * @swagger
 * /api/v1/movementHistory:
 *   post:
 *     summary: Registrar un nuevo movimiento en el historial de stock
 *     tags: [Movement History]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovementHistory'
 *     responses:
 *       201:
 *         description: Movimiento registrado con éxito
 *       400:
 *         description: Solicitud inválida
 *       401:
 *         description: No autorizado, se requiere token JWT válido.
 */
router.post('/movementHistory', authMiddleware.verifyToken, movementHistoryController.addMovementHistory);

module.exports = router;
