const express = require('express');
const stockController = require('../controllers/stock');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/stock', authMiddleware.verifyToken, stockController.getStock);
router.get('/stock/:sku', authMiddleware.verifyToken, stockController.getStockBySku);
router.post('/stock', authMiddleware.verifyToken, stockController.addStock);
router.put('/stock/:sku', authMiddleware.verifyToken, stockController.updateStock);
router.delete('/stock/:sku', authMiddleware.verifyToken, stockController.deleteStock);

module.exports = router;
