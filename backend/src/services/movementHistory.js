const prisma = require('../util/prisma');
const logger = require('../util/logger');

module.exports = {
  async getMovementHistory() {
    logger.info('services/movementHistory.js | Entering getMovementHistory()');

    const stockItems = await prisma.stock.findMany();
    return stockItems;
  },

  async getMovementHistoryBySku(sku) {
    logger.info('services/movementHistory.js | Entering getMovementHistoryBySku()');

    // Buscamos el historial de movimientos por su SKU
    const history = await prisma.stock.findUnique({
      where: { sku },
      include: { movements: true }, // Incluir los movimientos asociados
    });

    return history;
  },

  async addMovementHistory(stockId, type, quantity) {
    logger.info('services/movementHistory.js | Entering addMovementHistory()');

    const movement = await prisma.movementHistory.create({
      data: {
        quantity,
        type,
        stockId: stockId,
      },
    });

    return movement;
  },
};
