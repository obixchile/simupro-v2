import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, TrendingUp, CheckCircle, ArrowUpRight, Building2 } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

const ESTADO_LABELS: Record<string, string> = {
  revision_interna: 'En Revisión',
  enviado_cliente: 'Enviado',
  ganado: 'Ganado',
  perdido: 'Perdido',
};

const ESTADO_COLORS: Record<string, string> = {
  revision_interna: '#f59e0b',
  enviado_cliente: '#3b82f6',
  ganado: '#10b981',
  perdido: '#ef4444',
};

const CARD_STYLE: React.CSSProperties = {
  background: 'white',
  borderRadius: 12,
  padding: '1.5rem',
  boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)',
  border: '1px solid #e2e8f0',
};

export default function Dashboard() {
  const { propuestas } = useApp();

  const stats = [
    { label: 'Total Propuestas', val: propuestas.length, icon: LayoutDashboard, color: '#3b82f6', border: '#3b82f6', sub: propuestas.length + ' registradas' },
    { label: 'En Revisión', val: propuestas.filter(p => p.estado === 'revision_interna').length, icon: TrendingUp, color: '#f59e0b', border: '#f59e0b', sub: 'pendientes de revisión' },
    { label: 'Ganadas', val: propuestas.filter(p => p.estado === 'ganado').length, icon: CheckCircle, color: '#10b981', border: '#10b981', sub: 'propuestas cerradas' },
    { label: 'Empresas', val: new Set(propuestas.map(p => p.clienteNombre)).size, icon: Building2, color: '#8b5cf6', border: '#8b5cf6', sub: 'clientes activos' },
  ];

  const barData = propuestas.map(p => ({
    name: p.clienteNombre.split(' ').slice(0, 2).join(' '),
    monto: Math.round(p.monto / 1_000_000 * 10) / 10,
  }));

  const estadoCounts: Record<string, number> = {};
  propuestas.forEach(p => {
    estadoCounts[p.estado] = (estadoCounts[p.estado] || 0) + 1;
  });
  const pieData = Object.entries(estadoCounts).map(([estado, count]) => ({
    name: ESTADO_LABELS[estado] || estado,
    value: count,
    color: ESTADO_COLORS[estado] || '#94a3b8',
  }));

  const totalMonto = propuestas.reduce((s, p) => s + p.monto, 0);

  return (
    <div className="page-container" style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: "'Roboto', sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.4rem', letterSpacing: '-0.5px' }}>
            ⚡ EnergyCore Dashboard
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>Bienvenido al núcleo inteligente del suministro energético</p>
        </div>

        {/* CHARTS */}
        <div className="grid-charts" style={{ marginBottom: '1.5rem' }}>

          {/* Bar Chart */}
          <div style={CARD_STYLE}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>Montos por Propuesta</h3>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>En millones de pesos (CLP)</p>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: '#ecfdf5', color: '#10b981',
                fontSize: '0.8rem', fontWeight: 600,
                padding: '4px 10px', borderRadius: 20,
              }}>
                <ArrowUpRight size={13} />
                <span>${(totalMonto / 1_000_000).toFixed(1)}M total</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={barData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  formatter={(v: number) => [`$${v.toFixed(1)}M`, 'Monto']}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="monto" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div style={CARD_STYLE}>
            <div style={{ marginBottom: '1.25rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>Estado de Propuestas</h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Distribución por estado actual</p>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={52}
                  outerRadius={82}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number, name: string) => [v + ' propuestas', name]}
                  contentStyle={{ borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 13, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, color: '#64748b', paddingTop: 8 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid-kpi-4" style={{ marginBottom: '1.5rem' }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              ...CARD_STYLE,
              borderTop: `3px solid ${s.border}`,
              padding: '1.25rem 1.25rem 1rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748b' }}>{s.label}</span>
                <s.icon size={16} color={s.color} />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.35rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Recent proposals table */}
        <div style={CARD_STYLE}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#0f172a' }}>Propuestas Recientes</h3>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>Últimas propuestas registradas</p>
            </div>
            <button style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 8, padding: '6px 14px', fontSize: 13, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>Ver todas</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 480 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8', fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Cliente</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', color: '#94a3b8', fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Estado</th>
                  <th style={{ textAlign: 'right', padding: '8px 12px', color: '#94a3b8', fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Monto</th>
                </tr>
              </thead>
              <tbody>
                {propuestas.slice(0, 5).map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' }}>
                    <td style={{ padding: '12px 12px', color: '#0f172a', fontWeight: 500 }}>{p.clienteNombre}</td>
                    <td style={{ padding: '12px 12px' }}>
                      <span style={{
                        background: (ESTADO_COLORS[p.estado] || '#94a3b8') + '18',
                        color: ESTADO_COLORS[p.estado] || '#94a3b8',
                        borderRadius: 20,
                        padding: '3px 10px',
                        fontSize: 12,
                        fontWeight: 600,
                        border: `1px solid ${(ESTADO_COLORS[p.estado] || '#94a3b8')}30`,
                      }}>
                        {ESTADO_LABELS[p.estado] || p.estado}
                      </span>
                    </td>
                    <td style={{ padding: '12px 12px', textAlign: 'right', color: '#0f172a', fontWeight: 600 }}>${p.monto.toLocaleString('es-CL')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
