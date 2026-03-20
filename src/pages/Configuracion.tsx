import React from 'react';
export default function Configuracion() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Información Personal</h1>
      <p className="text-gray-500 mb-6">Actualiza tu información de perfil</p>
      <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
          <input type="text" defaultValue="Usuario Admin" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" defaultValue="admin@simupro.cl" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input type="text" defaultValue="+56 2 2345 6789" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" disabled />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Empresa</label>
          <input type="text" defaultValue="SIMUPRO" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" disabled />
        </div>
        <button className="px-4 py-2 text-sm font-medium rounded-md text-white bg-[#0033A0] hover:bg-blue-700">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}