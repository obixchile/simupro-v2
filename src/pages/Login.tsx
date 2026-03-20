import React, { useState, useEffect } from 'react';
import { USUARIOS_DEMO } from '../data/mockData';
import { Zap, TrendingUp, Info } from 'lucide-react';

const ENEL_LOGO = 'https://www.enel.cl/content/dam/enel-cl/maintenance/LogoEnel-312x114.png';

const NOVEDADES = [
  { title: 'Nueva Sección $ Energía', desc: 'Gestión centralizada de precios base con mapa interactivo', icon: Zap, color: '#10b981', bg: 'rgba(16,185,129,0.15)', date: 'Marzo 2026' },
  { title: 'Gráficos de GWh Mejorados', desc: 'Dashboard con análisis visual de energía ofertada y adjudicada', icon: TrendingUp, color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', date: 'Marzo 2026' },
  { title: 'Gestión de Versiones', desc: 'Edita propuestas y crea nuevas versiones manteniendo el historial', icon: Info, color: '#a78bfa', bg: 'rgba(167,139,250,0.15)', date: 'Marzo 2026' },
];

interface Props { onLogin: (u: { nombre: string; email: string; rol: string }) => void }

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActiveIdx(prev => (prev + 1) % NOVEDADES.length);
        setAnimating(false);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const u = USUARIOS_DEMO.find(x => x.email === email && x.password === pw);
    if (u) onLogin({ nombre: u.nombre, email: u.email, rol: u.rol });
    else setErr('Credenciales incorrectas');
  };

  const nov = NOVEDADES[activeIdx];
  const NovIcon = nov.icon;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgb(13, 27, 42)'
, fontFamily: "'Roboto',sans-serif", padding: '2rem 1rem' }}>
      <img src={ENEL_LOGO} alt="Enel" style={{ height: 76, filter: 'brightness(0) invert(1)', marginBottom: '2rem' }} />
      <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ width: '100%', style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '1.5rem 2rem', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#2563eb,#3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(59,130,246,0.4)' }}>
              <Zap size={24} color="white" fill="white" />
            </div>
            <h1 style={{ color: 'white', fontSize: 28, fontWeight: 700, margin: 0 }}>EnergyCore</h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0 }}>El núcleo inteligente del suministro energético</p>
        </div>
        <div style={{ width: '100%', background: 'white', borderRadius: 20, padding: '2.5rem 2rem', boxShadow: '0 20px 60px rgba(0,0,0,0,4)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', textAlign: 'center', margin: '0 0 0.5rem' }}>Iniciar Sesión</h2>
          <p style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center', margin: '0 0 1.75rem' }}>Ingresa tus credenciales para acceder al sistema</p>
          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box', outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} placeholder="demo@enel.com" required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>Contraseña</label>
              <input type="password" value={pw} onChange={e => setPw(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box', outline: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} placeholder="••••••••" required />
            </div>
            {err && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#dc2626' }}>{err}</div>}
            <button type="submit" style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#1d4ed8,#3b82f6)', color: 'white', fontSize: 15, fontWeight: 700, cursor: 'pointer', marginTop: 6, boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>Entrar</button>
          </form>
          <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', marginTop: '1.25rem', marginBottom: 0 }}>¿Problemas para acceder? <a href="mailto:soporte@energycore.cl" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>Contactar soporte</a></p>
        </div>
        <div style={{ width: '100%', background: 'rgba(255,255,255,0.07)', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '1.25rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Zap size={18} color="#fbbf24" fill="#fbbf24" />
            <span style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>Novedades del Sistema</span>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Últimas actualizaciones</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.08)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', transition: 'opacity 0.4s ease,transform 0.4s ease', opacity: animating ? 0 : 1, transform: animating ? 'translateY(-8px)' : 'translateY(0)' }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: nov.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <NovIcon size={20} color={nov.color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{nov.title}</span>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginLeft: 8, whiteSpace: 'nowrap' }}>{nov.date}</span>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>{nov.desc}</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
            {NOVEDADES.map((_, i) => (
              <div key={i} onClick={() => setActiveIdx(i)} style={{ width: i === activeIdx ? 18 : 6, height: 6, borderRadius: 3, background: i === activeIdx ? '#3b82f6' : 'rgba(255,255,255,0.25)', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
        <a href="https://www.obix.cl/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', opacity: 0.55, marginTop: '0.25rem' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>Desarrollado por obix.cl</span>
        </a>
      </div>
    </div>
  );
}
