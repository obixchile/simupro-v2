import React, { useState, useEffect } from 'react';
import { USUARIOS_DEMO } from '../data/mockData';
import { Zap, TrendingUp, Info } from 'lucide-react';

const ENEL_LOGO = 'https://www.enel.cl/content/dam/enel-cl/maintenance/LogoEnel-312x114.png';
const OBIX_LOGO = 'https://www.obix.cl/wp-content/uploads/2021/08/logo-obix.png';

const NOVEDADES = [
  { title: 'Nueva Sección $ Energía', desc: 'Gestión centralizada de precios base con mapa interactivo', icon: Zap, color: '#10b981', bg: '#ecfdf5', date: 'Marzo 2026' },
  { title: 'Gráficos de GWh Mejorados', desc: 'Dashboard con análisis visual de energía ofertada y adjudicada', icon: TrendingUp, color: '#3b82f6', bg: '#eff6ff', date: 'Marzo 2026' },
  { title: 'Gestión de Versiones de Propuestas', desc: 'Edita propuestas y crea nuevas versiones manteniendo el historial', icon: Info, color: '#8b5cf6', bg: '#f3e8ff', date: 'Marzo 2026' },
];

interface Props { onLogin: (u: { nombre: string; email: string; rol: string }) => void }

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [currentNews, setCurrentNews] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => { setCurrentNews(prev => (prev + 1) % NOVEDADES.length); }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const u = USUARIOS_DEMO.find(x => x.email === email && x.password === pw);
    if (u) onLogin({ nombre: u.nombre, email: u.email, rol: u.rol });
    else setErr('Credenciales incorrectas');
  };

  return (<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', fontFamily: "'Roboto', sans-serif", padding: '2rem 1.5rem' }}>
    <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', width: '100%', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: '48px 40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <img src={ENEL_LOGO} alt="Enel" style={{ height: 72, marginBottom: 20, filter: 'brightness(0) invert(1)', display: 'block' }} />
            <h1 style={{ color: 'white', fontSize: 38, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-1px' }}>⚡ EnergyCore</h1>
            <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 36px' }}>El núcleo inteligente del suministro energético</p>
            <h2 style={{ color: 'white', fontSize: 20, fontWeight: 600, margin: '0 0 24px', alignSelf: 'flex-start' }}>Iniciar Sesión</h2>
            <form onSubmit={handle} style={{ width: '100%' }}>
              <div style={{ marginBottom: 16, textAlign: 'left' }}>
                <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Email Corporativo</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} required />
              </div>
              <div style={{ marginBottom: 16, textAlign: 'left' }}>
                <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Contraseña</label>
                <input type="password" value={pw} onChange={e => setPw(e.target.value)} style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, boxSizing: 'border-box', outline: 'none' }} required />
              </div>
              {err && <p style={{ color: '#f87171', fontSize: 13, margin: '0 0 12px' }}>{err}</p>}
              <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: 'white', fontSize: 17, fontWeight: 800, cursor: 'pointer', marginTop: 8, letterSpacing: '0.02em' }}>Entrar</button>
            </form>
            <p style={{ color: '#475569', fontSize: 12, marginTop: 24 }}>Modo Demo: demo@enel.com | enel2026</p>
          </div>
          <div style={{ textAlign: 'center' }}><span style={{ color: '#94a3b8', fontSize: 14 }}>¿Problemas para acceder? </span><a href="mailto:soporte@energycore.cl" style={{ color: '#60a5fa', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Contactar soporte</a></div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: '40px 36px', minHeight: 500, display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ color: 'white', fontSize: 28, fontWeight: 700, margin: '0 0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}><Zap size={28} color="#fbbf24" />Novedades del Sistema</h2>
            <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>Últimas actualizaciones y mejoras</p>
          </div>
          <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
            {NOVEDADES.map((item, i) => {
              const isActive = i === currentNews;
              const isPrev = i === (currentNews - 1 + NOVEDADES.length) % NOVEDADES.length;
              const isNext = i === (currentNews + 1) % NOVEDADES.length;
              let yOffset = 0; let opacity = 0; let scale = 0.85;
              if (isActive) { yOffset = 0; opacity = 1; scale = 1; }
              else if (isPrev) { yOffset = -120; opacity = 0; scale = 0.85; }
              else if (isNext) { yOffset = 120; opacity = 0.4; scale = 0.9; }
              else { yOffset = 240; opacity = 0; scale = 0.85; }
              return (<div key={i} style={{ position: 'absolute', top: '50%', left: 0, right: 0, transform: `translateY(calc(-50% + ${yOffset}px)) scale(${scale})`, opacity: opacity, transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', pointerEvents: isActive ? 'auto' : 'none' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <item.icon size={24} color={item.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, margin: 0 }}>{item.title}</h3>
                        <span style={{ color: '#64748b', fontSize: 12, whiteSpace: 'nowrap', marginLeft: 12 }}>{item.date}</span>
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>);
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
            {NOVEDADES.map((_, i) => (<button key={i} onClick={() => setCurrentNews(i)} style={{ width: i === currentNews ? 24 : 8, height: 8, borderRadius: 4, border: 'none', background: i === currentNews ? '#3b82f6' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />))}
          </div>
        </div>
      </div>
    </div>
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ color: '#64748b', fontSize: 14 }}>Powered by </span>
        <a href="https://www.obix.cl" target="_blank" rel="noopener noreferrer"><img src={OBIX_LOGO} alt="Obix" style={{ height: 22, verticalAlign: 'middle', filter: 'brightness(0) invert(0.6)', marginLeft: 4 }} /></a>
      </div>
      <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>EnergyCore v2.0 • Enel Chile</p>
      <p style={{ color: '#475569', fontSize: 12, margin: '4px 0 0' }}>© 2026 Todos los derechos reservados</p>
    </div>
  </div>);
}
