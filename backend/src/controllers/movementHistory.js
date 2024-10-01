const logger = require('../util/logger');
const httpCodes = require('http-status-codes');

const movementHistoryService = require('../services/movementHistory');
const stockService = require('../services/stock');

module.exports = {
  async getMovementHistory(req, res) {
    logger.info('controllers/movementHistory.js | Entering getMovementHistory()');

    try {
      const movementHistory = await movementHistoryService.getMovementHistory();
      return res.status(httpCodes.StatusCodes.OK).json(movementHistory);
    } catch (error) {
      logger.error('controllers/movementHistory.js  | Error al obtener el historial de movimiento');
      logger.debug(`controllers/movementHistory.js  | Error: ${error.message}`);
      res.status(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Ha habido un problema al obtener el stock' });
    }
  },

  async getMovementHistoryBySku(req, res) {
    logger.info('controllers/movementHistory.js | Entering getMovementHistoryBySKU()');

    const { sku } = req.params;

    if (!sku) return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'No se ha indicado el SKU del item a obtener' });

    logger.debug(`controllers/movementHistory.js | Obteniendo stock con SKU: ${sku}`);

    try {
      const movementHistory = await movementHistoryService.getMovementHistoryBySku(sku);

      if (!movementHistory) {
        return res.status(httpCodes.StatusCodes.NOT_FOUND).json({ error: `Historial de movimientos para el item con SKU ${sku} no encontrado` });
      }

      return res.status(httpCodes.StatusCodes.OK).json(movementHistory);
    } catch (error) {
      logger.error('controllers/movementHistory.js  | Error al obtener el historial de movimiento');
      logger.debug(`controllers/movementHistory.js  | Error: ${error.message}`);
      res
        .status(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Ha habido un problema al obtener el historial de movimiento para el ID solicitado' });
    }
  },

  async addMovementHistory(req, res) {
    logger.info('controllers/movementHistory.js | Entering addMovementHistory()');

    try {
      const { sku, type, quantity } = req.body;

      if (!sku || !type || !quantity) return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'Falta algun campo necesario por definir' });

      logger.debug(`controllers/movementHistory.js | Stock SKU: ${sku}`);
      logger.debug(`controllers/movementHistory.js | Type: ${type}`);
      logger.debug(`controllers/movementHistory.js | Quantity: ${quantity}`);

      // Buscamos el ítem de stock por su SKU
      const stockItem = await stockService.getStockBySku(sku);

      logger.debug(`controllers/movementHistory.js | Obtenido el item con SKU ${stockItem.sku}`);

      // Comprobamos que existe el item
      if (!stockItem) {
        return res.status(httpCodes.StatusCodes.NOT_FOUND).json({ error: `Item con SKU ${sku} no encontrado` });
      }

      // Validamos si tipo de movimiento es salida y hay suficiente cantidad
      if (type === 'EXIT' && stockItem.quantity < quantity) {
        return res.status(httpCodes.StatusCodes.BAD_REQUEST).json({ error: 'Cantidad insuficiente en stock' });
      }

      // Actualizamos la cantidad de stock
      const updatedQuantity = type === 'ENTRY' ? stockItem.quantity + quantity : stockItem.quantity - quantity;

      // Actualizamos el stock
      await stockService.updateStock(sku, updatedQuantity);

      logger.debug(`controllers/movementHistory.js | Stock para el item con SKU ${stockItem.sku} actualizado a ${stockItem.quantity}`);

      // Creamos el movimiento de stock
      const movement = await movementHistoryService.addMovementHistory(stockItem.id, type, updatedQuantity);

      res.status(httpCodes.StatusCodes.CREATED).json(movement);
    } catch (error) {
      logger.error('controllers/movementHistory.js  | Error al añadir una entrada al historial de movimiento');
      logger.debug(`controllers/movementHistory.js  | Error: ${error.message}`);
      res.status(httpCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Error al añadir una entrada al historial de movimiento' });
    }
  },
};
