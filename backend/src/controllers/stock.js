const logger = require('../util/logger');
const httpCodes = require('http-status-codes');

const stockService = require('../services/stock');

module.exports = {
  async getStock(req, res) {
    logger.info('controllers/stock.js - Entering getStock()');

    try {
      const stockItems = await stockService.getStock();
      return res.status(httpCodes.StatusCodes.OK).json(stockItems);
    } catch (error) {
      res.status(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Ha habido un problema al obtener el stock' });
    }
  },

  async getStockBySku(req, res) {
    logger.info('controllers/stock.js - Entering getStockBySku()');

    const { sku } = req.params;

    if (!sku) return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'No se ha indicado el SKU del item a obtener' });

    logger.debug(`controllers/stock.js - Obteniendo stock con SKU: ${sku}`);

    try {
      const stockItem = await stockService.getStockBySku(sku);

      if (!stockItem) {
        return res.status(httpCodes.StatusCodes.NOT_FOUND).json({ error: 'Stock no encontrado' });
      }

      return res.status(httpCodes.StatusCodes.OK).json(stockItem);
    } catch (error) {
      res.status(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Ha habido un problema al obtener el stock para el SKU solicitado' });
    }
  },

  async addStock(req, res) {
    logger.info('controllers/stock.js - Entering addStock()');

    const { sku, ean13, quantity } = req.body;

    if (!sku || !ean13 || !quantity) return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'Falta algun campo necesario por definir' });

    logger.debug(`controllers/stock.js - SKU: ${sku}`);
    logger.debug(`controllers/stock.js - EAN13: ${ean13}`);
    logger.debug(`controllers/stock.js - Quantity: ${quantity}`);

    try {
      const newStock = await stockService.addStock(sku, ean13, quantity);
      res.status(httpCodes.StatusCodes.CREATED).json(newStock);
    } catch (error) {
      logger.error(`controllers/stock.js - ${error}`);
      res.status(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error al crear el ítem de stock' });
    }
  },

  async updateStock(req, res) {
    logger.info('controllers/stock.js - Entering updateStock()');

    const { sku } = req.params;
    const { quantity } = req.body;

    if (!sku) return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'No se ha indicado el SKU del item a actualizar' });
    if (!quantity) return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'No se ha indicado la cantidad a actualizar' });

    logger.debug(`controllers/stock.js - Actualizando stock con SKU: ${sku}`);
    logger.debug(`controllers/stock.js - Quantity: ${quantity}`);

    try {
      const updatedStock = await stockService.updateStock(sku, quantity);
      res.status(httpCodes.StatusCodes.OK).json(updatedStock);
    } catch (error) {
      res.status(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error al actualizar el ítem' });
    }
  },

  async deleteStock(req, res) {
    logger.info('controllers/stock.js - Entering deleteStock()');

    const { sku } = req.params;

    if (!sku) return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'No se ha indicado el SKU del item a actualizar' });

    logger.debug(`controllers/stock.js - Borrando stock con SKU: ${sku}`);

    try {
      const deletedStock = await stockService.deleteStock(sku);
      res.status(httpCodes.StatusCodes.OK).json(deletedStock);
    } catch (error) {
      res.status(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error al eliminar el stock' });
    }
  },
};
