import React from 'react';

interface MovementTableProps {
  movements: Movement[]; // Cambiamos el nombre a movements
}

const MovementTable: React.FC<MovementTableProps> = ({ movements }) => {
  return (
    <div className="overflow-x-auto w-full mb-4 text-center">
      <h2 className="text-2xl font-extrabold dark:text-white mb-4">Listado de movimientos</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID de Stock</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {movements &&
            movements.map(movement => (
              <tr key={movement.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{Math.abs(movement.quantity)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.type === 'ENTRY' ? 'Entrada' : 'Salida  '}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(movement.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{movement.stockId}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovementTable;
