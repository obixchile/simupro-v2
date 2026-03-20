import React, { useState } from 'react';
import { USUARIOS_DEMO } from '../data/mockData';

const ENEL_LOGO = 'https://www.enel.cl/content/dam/enel-cl/maintenance/LogoEnel-312x114.png';
const OBIX_LOGO = 'https://www.obix.cl/wp-content/uploads/2021/08/logo-obix.png';

interface Props { onLogin: (u: { nombre: string; email: string; rol: string }) => void }

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const u = USUARIOS_DEMO.find(x => x.email === email && x.password === pw);
    if (u) onLogin({ nombre: u.nombre, email: u.email, rol: u.rol });
    else setErr('Credenciales incorrectas');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)',
      fontFamily: "'Roboto', sans-serif",
      padding: '24px',
    }}>
      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: 440,
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.1)',
        padding: '48px 40px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Enel Logo centered */}
        <img
          src={ENEL_LOGO}
          alt="Enel"
          style={{ height: 48, marginBottom: 24, filter: 'brightness(0) invert(1)', display: 'block' }}
        />
        <h1 style={{ color: 'white', fontSize: 38, fontWeight: 700, margin: '0 0 6px', letterSpacing: '-1px' }}>EnergyCore</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 36px' }}>
          El núcleo inteligente del suministro energético
        </p>

        <h2 style={{ color: 'white', fontSize: 20, fontWeight: 600, margin: '0 0 24px', alignSelf: 'flex-start' }}>Iniciar Sesión</h2>

        <form onSubmit={handle} style={{ width: '100%' }}>
          <div style={{ marginBottom: 16, textAlign: 'left' }}>
            <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Email Corporativo</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
              required
            />
          </div>
          <div style={{ marginBottom: 16, textAlign: 'left' }}>
            <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 6 }}>Contraseña</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, boxSizing: 'border-box', outline: 'none' }}
              required
            />
          </div>
          {err && <p style={{ color: '#f87171', fontSize: 13, margin: '0 0 12px' }}>{err}</p>}
          <button
            type="submit"
            style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #2563eb, #3b82f6)', color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 8 }}
          >
            Entrar al Núcleo
          </button>
        </form>

        <p style={{ color: '#475569', fontSize: 12, marginTop: 24 }}>Modo Demo: demo@enel.com | enel2026</p>
      </div>

      {/* Obix footer */}
      <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ color: '#475569', fontSize: 12 }}>Powered by</span>
        <a href="https://www.obix.cl" target="_blank" rel="noopener noreferrer">
          <img src={OBIX_LOGO} alt="Obix" style={{ height: 24, filter: 'brightness(0) invert(0.6)' }} />
        </a>
      </div>
    </div>
  );
}
