import React, { useState } from 'react';

interface StockItem {
  id: number;
  sku: string;
  ean13: string;
  quantity: number;
  onButtonClick: (sku: string, quantity: number) => void;
}

interface StockTableProps {
  items: StockItem[];
}

const StockTable: React.FC<StockTableProps> = ({ items }) => {
  const [quantities, setQuantities] = useState<Record<number, number>>(
    items.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {} as Record<number, number>),
  );

  const handleInputChange = (id: number, value: string) => {
    const newValue = value === '' ? 0 : Number(value);
    setQuantities(prev => ({ ...prev, [id]: newValue })); // Actualiza la cantidad correspondiente
  };

  return (
    <div className="overflow-x-auto w-full mb-4 text-center">
      <h2 className="text-2xl font-extrabold dark:text-white mb-4">Listado de stock</h2>

      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-gray-50 text-center">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">EAN13</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Sumar o restar cantidad</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"></th> {}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map(item => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sku}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ean13}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <input type="number" onChange={e => handleInputChange(item.id, e.target.value)} className="border border-gray-300 rounded p-1" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  onClick={() => item.onButtonClick(item.sku, quantities[item.id])}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Modificar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
