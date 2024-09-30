const express = require('express');
const stockController = require('../controllers/stock');

const router = express.Router();

router.get('/stock', stockController.getStock);
router.get('/stock/:id', stockController.getStockById);
router.post('/stock', stockController.addStock);
router.put('/stock/:id', stockController.updateStock);
router.delete('/stock/:id', stockController.deleteStock);

module.exports = router;
