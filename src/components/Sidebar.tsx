import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Users, Zap, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';

const ENEL_LOGO = 'https://www.enel.cl/content/dam/enel-cl/maintenance/LogoEnel-312x114.png';
const OBIX_LOGO = 'https://www.obix.cl/wp-content/uploads/2021/08/logo-obix.png';

const NAV = [
  { key: '/', label: 'Dashboard', Icon: LayoutDashboard },
  { key: '/nueva-propuesta', label: 'Nueva Propuesta', Icon: FilePlus },
  { key: '/clientes', label: 'Clientes', Icon: Users },
  { key: '/energia', label: 'Energía', Icon: Zap },
  { key: '/reportes', label: 'Reportes', Icon: BarChart3 },
  { key: '/configuracion', label: 'Configuración', Icon: Settings },
];

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? 'active' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>

        {/* Header: Logo */}
        <div style={{
          width: '100%',
          padding: '28px 8px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          marginBottom: 8,
        }}>
          <img
            src={ENEL_LOGO}
            alt="Enel Chile"
            style={{
              height: 24,
              maxWidth: 48,
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
              display: 'block',
              margin: '0 auto',
            }}
          />
          <div className="brand-text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 18, marginTop: 12, letterSpacing: '-0.5px' }}>⚡ EnergyCore</span>
            <span style={{ color: '#64748b', fontSize: 11, marginTop: 4, lineHeight: 1.4, textAlign: 'center' }}>El núcleo inteligente del<br />suministro energético</span>
          </div>
        </div>

        {/* Nav items */}
        <nav style={{ width: '100%', padding: '0 8px', flex: 1 }}>
          {NAV.map(({ key, label, Icon }) => {
            const active = location.pathname === key;
            return (
              <button
                key={key}
                onClick={() => {
                  navigate(key);
                  setMobileOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 0',
                  paddingLeft: 20,
                  borderRadius: 12,
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: 4,
                  fontSize: 14,
                  fontWeight: active ? 600 : 400,
                  background: active ? 'linear-gradient(135deg, #2563eb, #3b82f6)' : 'transparent',
                  color: active ? 'white' : '#94a3b8',
                  transition: 'all 0.2s',
                  boxShadow: active ? '0 4px 15px rgba(59,130,246,0.3)' : 'none',
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                <span className="nav-label">{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom: logout + Obix */}
        <div style={{
          width: '100%',
          padding: '16px 8px 24px',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}>
          <button
            onClick={() => { onLogout(); setMobileOpen(false); }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 0',
              paddingLeft: 20,
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              background: 'transparent',
              color: '#64748b',
              fontSize: 14,
            }}
          >
            <LogOut size={18} />
            <span className="nav-label">Cerrar Sesión</span>
          </button>

          {/* Obix logo - full */}
          <a
            href="https://www.obix.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-full"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
              opacity: 0.7,
              transition: 'opacity 0.2s',
            }}
          >
            <span style={{ color: '#475569', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Powered by</span>
            <img
              src={OBIX_LOGO}
              alt="Obix"
              style={{ height: 28, objectFit: 'contain', filter: 'brightness(0) invert(0.7)' }}
            />
          </a>

          {/* Obix logo - mini */}
          <a href="https://www.obix.cl" target="_blank" rel="noopener noreferrer" className="footer-mini">
            <img src={OBIX_LOGO} alt="Obix" style={{ height: 20, filter: 'brightness(0) invert(0.5)' }} />
          </a>
        </div>
      </aside>
    </>
  );
}
