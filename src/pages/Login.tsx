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
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Enel_Logo.svg/1024px-Enel_Logo.svg.png" alt="Enel" style={{ height: 40, marginBottom: 32 }} />
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ color: 'white', fontSize: 42, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-1px' }}>EnergyCore</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>El núcleo inteligente del suministro energético</p>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 32, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
          <h2 style={{ color: 'white', fontSize: 24, marginBottom: 24, fontWeight: 500 }}>Iniciar Sesión</h2>
          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8, marginLeft: 4 }}>Email Corporativo</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, boxSizing: 'border-box' }} required />
            </div>
            <div style={{ textAlign: 'left' }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8, marginLeft: 4 }}>Contraseña</label>
              <input type="password" value={pw} onChange={e => setPw(e.target.value)} style={{ width: '100%', padding: '14px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 15, boxSizing: 'border-box' }} required />
            </div>
            {err && <p style={{ color: '#f87171', fontSize: 14, margin: 0 }}>{err}</p>}
            <button type="submit" style={{ padding: '16px', borderRadius: 12, border: 'none', background: 'linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%)', color: 'white', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 8 }}>Entrar al Núcleo</button>
          </form>
          <div style={{ marginTop: 24, padding: 12, borderRadius: 12, background: 'rgba(0, 210, 255, 0.05)', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
            <p style={{ color: '#00d2ff', fontSize: 12, margin: 0 }}>Modo Demo: demo@enel.com | enel2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}