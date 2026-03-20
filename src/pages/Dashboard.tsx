import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, TrendingUp, Users, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const { propuestas } = useApp();
  
  const stats = [
    { label: 'Total Propuestas', val: propuestas.length, icon: LayoutDashboard, color: '#3b82f6' },
    { label: 'En Revisión', val: propuestas.filter(p => p.estado === 'revision_internar').length, icon: TrendingUp, color: '#f59e0b' },
    { label: 'Ganadas', val: propuestas.filter(p => p.estado === 'ganado').length, icon: CheckCircle, color: '#10b981' },
    { label: 'Empresas', val: new Set(propuestas.map(p => p.clienteNombre)).size, icon: Users, color: '#6366f1' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 font-['Roboto',sans-serif]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">EnergyCore Dashboard</h1>
        <p className="text-gray-500 text-lg">Bienvenido al núcleo inteligente del suministro energético</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <s.icon size={24} color={s.color} />
            </div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-gray-900">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Propuestas Recientes</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Ver todas</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Monto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {propuestas.slice(0, 5).map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{p.clienteNombre}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${p.estado === 'ganado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {p.estado.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    ${p.monto.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}