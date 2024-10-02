const express = require('express');
const stockController = require('../controllers/stock');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: Operaciones relacionadas con el stock de productos
 */

/**
 * @swagger
 * /api/v1/stock:
 *   get:
 *     summary: Obtener lista de productos en inventario
 *     tags: [Stock]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stock'
 *       401:
 *         description: No autorizado, se requiere token JWT válido.
 */
router.get('/stock', authMiddleware.verifyToken, stockController.getStock);

/**
 * @swagger
 * /api/v1/stock/{sku}:
 *   get:
 *     summary: Obtener detalles de un producto por SKU
 *     tags: [Stock]
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
 *         description: Información del producto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stock'
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autorizado, se requiere token JWT válido.
 */
router.get('/stock/:sku', authMiddleware.verifyToken, stockController.getStockBySku);

/**
 * @swagger
 * /api/v1/stock:
 *   post:
 *     summary: Agregar un nuevo producto al inventario
 *     tags: [Stock]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       201:
 *         description: Producto agregado con éxito
 *       400:
 *         description: Solicitud inválida
 *       401:
 *         description: No autorizado, se requiere token JWT válido.
 */
router.post('/stock', authMiddleware.verifyToken, stockController.addStock);

/**
 * @swagger
 * /api/v1/stock/{sku}:
 *   put:
 *     summary: Actualizar información de un producto por SKU
 *     tags: [Stock]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sku
 *         schema:
 *           type: string
 *         required: true
 *         description: SKU del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       200:
 *         description: Producto actualizado con éxito
 *       400:
 *         description: Solicitud inválida
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autorizado, se requiere token JWT válido.
 */
router.put('/stock/:sku', authMiddleware.verifyToken, stockController.updateStock);

/**
 * @swagger
 * /api/v1/stock/{sku}:
 *   delete:
 *     summary: Eliminar un producto por SKU
 *     tags: [Stock]
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
 *         description: Producto eliminado con éxito
 *       404:
 *         description: Producto no encontrado
 *       401:
 *         description: No autorizado, se requiere token JWT válido.
 */
router.delete('/stock/:sku', authMiddleware.verifyToken, stockController.deleteStock);

module.exports = router;
