const express = require('express');
const movementHistoryController = require('../controllers/movementHistory');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/movementHistory', authMiddleware.verifyToken, movementHistoryController.getMovementHistory);
router.get('/movementHistory/:sku', authMiddleware.verifyToken, movementHistoryController.getMovementHistoryBySku);
router.post('/movementHistory', authMiddleware.verifyToken, movementHistoryController.addMovementHistory);

module.exports = router;
