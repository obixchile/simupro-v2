import React, { useState } from 'react';
import { USUARIOS_DEMO } from '../data/mockData';

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0d1b2a 0%, #1b263b 100%)', fontFamily: "'Roboto', sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420, padding: '0 24px', textAlign: 'center' }}>
        <img src="https://www.enel.cl/content/dam/enel-cl/maintenance/LogoEnel-312x114.png" alt="Enel" style={{ height: 40, marginBottom: 32, filter: 'brightness(0) invert(1)' }} />
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ color: 'white', fontSize: 42, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-1px' }}>EnergyCore</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>El n\u00facleo inteligente del suministro energ\u00e9tico</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: 20, padding: '40px 36px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ color: 'white', fontSize: 22, fontWeight: 600, margin: '0 0 24px' }}>Iniciar Sesi\u00f3n</h2>
          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 8 }}>Email Corporativo</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, boxSizing: 'border-box' }} required />
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500, display: 'block', marginBottom: 8 }}>Contrase\u00f1a</label>
              <input type="password" value={pw} onChange={e => setPw(e.target.value)} style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, boxSizing: 'border-box' }} required />
            </div>
            {err && <p style={{ color: '#f87171', fontSize: 13, margin: 0 }}>{err}</p>}
            <button type="submit" style={{ width: '100%', padding: '16px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', color: 'white', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Entrar al N\u00facleo</button>
          </form>
        </div>
        <p style={{ color: '#475569', fontSize: 12, marginTop: 24 }}>Modo Demo: demo@enel.com | enel2026</p>
      </div>
    </div>
  );
}
