import {useState} from 'react';
import{useApp}from '../context/AppContext';

export default function Clientes(){
const{propuestas}=useApp();
const[buscar,setBuscar]=useState('');
const clientes=Array.from(new Map(propuestas.map(p=>[p.clienteRut,{nombre:p.clienteNombre,rut:p.clienteRut,email:p.clienteEmail,tel:p.clienteTel,propuestas:propuestas.filter(x=>x.clienteRut===p.clienteRut),valor:propuestas.filter(x=>x.clienteRut===p.clienteRut).reduce((a,x)=>a+x.monto,0)}])).values());
const filtrados=clientes.filter(c=>c.nombre.toLowerCase().includes(buscar.toLowerCase())||c.rut.includes(buscar));
const totalValor=clientes.reduce((a,c)=>a+c.valor,0);
const totalProp=propuestas.length;
return(
<div className="page-container" style={{minHeight:'100vh',background:'#f8fafc'}}>
<div style={{textAlign:'center',marginBottom:'1.5rem'}}>
<h1 style={{fontSize:'1.75rem',fontWeight:700,color:'#0f172a',margin:0}}>👥 Gestión de Clientes</h1>
<p style={{color:'#64748b',margin:'0.25rem 0 0'}}>Administra tu cartera de clientes y propuestas</p>
</div>
<input value={buscar} onChange={e=>setBuscar(e.target.value)} placeholder='Buscar por nombre o RUT...' style={{width:'100%',padding:'0.75rem 1rem 0.75rem 2.5rem',borderRadius:'8px',border:'1px solid #e2e8f0',fontSize:'0.9rem',marginBottom:'1rem',boxSizing:'border-box',background:'white'}}/>
<div className="grid-kpi-3" style={{marginBottom:'1.5rem'}}>
{[{icon:'🖲',label:'Total Clientes',val:clientes.length,sub:clientes.length+' activos',border:'#3b82f6'},{icon:'↗️',label:'Valor Total',val:'$'+totalValor.toLocaleString('es-CL'),sub:'en propuestas',border:'#10b981'},{icon:'📄',label:'Propuestas Totales',val:totalProp,sub:'generadas',border:'#8b5cf6'}].map(s=>(
<div key={s.label} style={{background:'white',borderRadius:'12px',padding:'1.25rem',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',borderLeft:'4px solid '+s.border}}>
<p style={{fontSize:'0.75rem',color:'#64748b',fontWeight:600,margin:'0 0 0.5rem'}}>{s.icon} {s.label}</p>
<p style={{fontSize:'1.75rem',fontWeight:700,color:'#0f172a',margin:'0 0 0.25rem'}}>{s.val}</p>
<p style={{fontSize:'0.75rem',color:'#94a3b8',margin:0}}>{s.sub}</p>
</div>
))}
</div>
<div style={{background:'linear-gradient(135deg,#0033A0,#0052cc)',borderRadius:'12px',padding:'1rem 1.25rem',display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem',flexWrap:'wrap',gap:'0.5rem'}}>
<h2 style={{color:'white',fontWeight:700,margin:0,fontSize:'1rem'}}>Listado de Clientes</h2>
<button style={{background:'white',color:'#0033A0',border:'none',padding:'0.5rem 1rem',borderRadius:'6px',fontWeight:600,cursor:'pointer',fontSize:'0.85rem'}}>+ Nuevo Cliente</button>
</div>
{filtrados.map(c=>(
<div key={c.rut} className="client-card" style={{background:'white',borderRadius:'12px',padding:'1.25rem',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',marginBottom:'0.75rem'}}>
<div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
<div style={{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#0033A0,#3b82f6)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:'1.1rem',flexShrink:0}}>{c.nombre.charAt(0)}</div>
<div style={{minWidth:0}}>
<p style={{fontWeight:700,color:'#0f172a',margin:'0 0 0.15rem',fontSize:'0.95rem',overflow:'hidden',textOverflow:'ellipsis'}}>{c.nombre}</p>
<p style={{fontSize:'0.75rem',color:'#94a3b8',margin:'0 0 0.25rem'}}>{c.rut}</p>
<span style={{background:'#dbeafe',color:'#1d4ed8',fontSize:'0.65rem',padding:'0.15rem 0.5rem',borderRadius:'999px',fontWeight:600}}>Potencial</span>
<p style={{fontSize:'0.75rem',color:'#64748b',margin:'0.25rem 0 0'}}>{c.email}</p>
<p style={{fontSize:'0.75rem',color:'#64748b',margin:0}}>{c.tel}</p>
</div>
</div>
<div className="client-card-stats">
<div style={{textAlign:'center'}}>
<p style={{fontWeight:700,color:'#0f172a',margin:'0 0 0.15rem'}}>{c.propuestas.length}</p>
<p style={{fontSize:'0.7rem',color:'#94a3b8',margin:0}}>Propuestas</p>
</div>
<div style={{textAlign:'center'}}>
<p style={{fontWeight:700,color:'#0f172a',margin:'0 0 0.15rem'}}>${c.valor.toLocaleString('es-CL')}</p>
<p style={{fontSize:'0.7rem',color:'#94a3b8',margin:0}}>Valor Total</p>
</div>
<button style={{background:'#f1f5f9',color:'#475569',border:'none',padding:'0.5rem 1rem',borderRadius:'6px',cursor:'pointer',fontSize:'0.8rem',fontWeight:500}}>Ver Detalles</button>
</div>
</div>
))}
</div>
);
}