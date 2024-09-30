const prisma = require('../util/prisma');
const logger = require('../util/logger');

module.exports = {
  async getStock() {
    logger.info('services/stock.js - Entering getStock()');

    const stockItems = await prisma.stock.findMany();
    return stockItems;
  },

  async getStockById(id) {
    logger.info('services/stock.js - Entering getStockById()');

    const stockItem = await prisma.stock.findUnique({
      where: { id: Number(id) },
    });

    return stockItem;
  },

  async addStock(sku, ean13, quantity) {
    logger.info('services/stock.js - Entering addStock()');

    const newStock = await prisma.stock.create({
      data: {
        sku,
        ean13,
        quantity,
      },
    });

    return newStock;
  },

  async updateStock(id, quantity) {
    logger.info('services/stock.js - Entering updateStock()');

    const updatedStock = await prisma.stock.update({
      where: { id: Number(id) },
      data: { quantity },
    });

    return updatedStock;
  },

  async deleteStock(id) {
    logger.info('services/stock.js - Entering deleteStock()');

    const deletedStock = await prisma.stock.delete({
      where: { id: Number(id) },
    });

    return deletedStock;
  },
};
