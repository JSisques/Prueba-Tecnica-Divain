const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
  const stockItems = [
    { sku: 'SKU001', ean13: '1234567890123', quantity: 100 },
    { sku: 'SKU002', ean13: '1234567890124', quantity: 50 },
    { sku: 'SKU003', ean13: '1234567890125', quantity: 200 },
    { sku: 'SKU004', ean13: '1234567890126', quantity: 150 },
    { sku: 'SKU005', ean13: '1234567890127', quantity: 75 },
    { sku: 'SKU006', ean13: '1234567890128', quantity: 120 },
    { sku: 'SKU007', ean13: '1234567890129', quantity: 90 },
    { sku: 'SKU008', ean13: '1234567890130', quantity: 30 },
    { sku: 'SKU009', ean13: '1234567890131', quantity: 10 },
    { sku: 'SKU010', ean13: '1234567890132', quantity: 5 },
  ];

  for (const item of stockItems) {
    await prisma.stock.create({
      data: {
        sku: item.sku,
        ean13: item.ean13,
        quantity: item.quantity,
      },
    });
  }

  console.log('Datos de prueba insertados');
};

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
