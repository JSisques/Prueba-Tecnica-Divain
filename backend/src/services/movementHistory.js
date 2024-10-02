const prisma = require('../util/prisma');
const logger = require('../util/logger');

module.exports = {
  async getMovementHistory() {
    logger.info('services/movementHistory.js | Entering getMovementHistory()');

    const stockItems = await prisma.movementHistory.findMany();
    return stockItems;
  },

  async getMovementHistoryById(id) {
    logger.info('services/movementHistory.js | Entering getMovementHistoryById()');

    // Buscamos el historial de movimientos por su SKU
    const history = await prisma.movementHistory.findMany({
      where: { stockId: id },
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
