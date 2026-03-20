import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Users, Zap, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';

const ENEL_LOGO = 'https://www.enel.cl/content/dam/enel-cl/maintenance/LogoEnel-312x114.png';
const OBIX_LOGO = 'https://www.obix.cl/wp-content/uploads/2021/08/logo-obix.png';

const NAV = [
  { key: '/', label: 'Dashboard', Icon: LayoutDashboard },
  { key: '/nueva-propuesta', label: 'Nueva Propuesta', Icon: FilePlus },
  { key: '/clientes', label: 'Clientes', Icon: Users },
  { key: '/energia', label: 'Energ\u00eda', Icon: Zap },
  { key: '/reportes', label: 'Reportes', Icon: BarChart3 },
  { key: '/configuracion', label: 'Configuraci\u00f3n', Icon: Settings },
];

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg md:hidden">
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      <aside
        style={{ fontFamily: "'Roboto', sans-serif", minHeight: '100vh', width: open ? 288 : 80, background: '#0d1b2a', color: 'white', display: 'flex', flexDirection: 'column', transition: 'width 0.3s', overflow: 'hidden', borderRight: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <img
            src={ENEL_LOGO}
            alt="Enel Chile"
            style={{ height: 36, width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)', display: 'block' }}
          />
          {open && (
            <div style={{ marginTop: 12 }}>
              <p style={{ margin: 0, color: 'white', fontWeight: 700, fontSize: 15 }}>EnergyCore</p>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: 11, marginTop: 2 }}>El n\u00facleo inteligente del suministro energ\u00e9tico</p>
            </div>
          )}
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => navigate(key)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 16,
                padding: '12px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                fontSize: 14, transition: 'all 0.2s',
                background: location.pathname === key ? 'linear-gradient(to right, #2563eb, #60a5fa)' : 'transparent',
                color: location.pathname === key ? 'white' : '#94a3b8',
              }}
            >
              <Icon size={20} />
              {open && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={onLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: 14, background: 'transparent', color: '#f87171' }}
          >
            <LogOut size={20} />
            {open && <span>Cerrar Sesi\u00f3n</span>}
          </button>

          {open && (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
              <a href="https://www.obix.cl/" target="_blank" rel="noopener noreferrer" title="Desarrollado por Obix">
                <img
                  src={OBIX_LOGO}
                  alt="Obix"
                  style={{ height: 18, width: 'auto', opacity: 0.5, filter: 'brightness(0) invert(1)' }}
                />
              </a>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
