const prisma = require('../util/prisma');
const logger = require('../util/logger');

module.exports = {
  async getStock() {
    logger.info('services/stock.js - Entering getStock()');

    const stockItems = await prisma.stock.findMany();
    return stockItems;
  },

  async getStockBySku(sku) {
    logger.info('services/stock.js - Entering getStockBySku()');

    const stockItem = await prisma.stock.findUnique({
      where: { sku: sku },
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

  async updateStock(sku, quantity) {
    logger.info('services/stock.js - Entering updateStock()');

    const updatedStock = await prisma.stock.update({
      where: { sku: sku },
      data: { quantity: quantity },
    });

    return updatedStock;
  },

  async deleteStock(sku) {
    logger.info('services/stock.js - Entering deleteStock()');

    const deletedStock = await prisma.stock.delete({
      where: { sku: sku },
    });

    return deletedStock;
  },
};
