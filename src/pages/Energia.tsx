import React,{useState}from 'react';
const PRECIOS=[{id:1,troncal:'Troncal Central - Av. Providencia',subestacion:'SE Providencia 220kV',region:'RM',precio:120.50,propuestas:1},{id:2,troncal:'Troncal Oriente - Las Condes',subestacion:'SE Las Condes 110kV',region:'RM',precio:118.30,propuestas:0},{id:3,troncal:'Troncal Sur - Gran Avenida',subestacion:'SE La Cisterna 220kV',region:'RM',precio:115.80,propuestas:0},{id:4,troncal:'Troncal Norte - Conchali',subestacion:'SE Cerro Navia 110kV',region:'RM',precio:114.20,propuestas:0},{id:5,troncal:'Troncal Poniente - Maipu',subestacion:'SE Maipu 220kV',region:'RM',precio:113.50,propuestas:0}];
export default function Energia(){
const[precios,setPrecios]=useState(PRECIOS);
const[editando,setEditando]=useState<number|null>(null);
const[editVal,setEditVal]=useState('');
const promedio=(precios.reduce((a,p)=>a+p.precio,0)/precios.length).toFixed(2);
return(
<div style={{minHeight:'100vh',background:'#f8fafc',padding:'1.5rem'}}>
<div style={{textAlign:'center',marginBottom:'1.5rem'}}>
<h1 style={{fontSize:'1.75rem',fontWeight:700,color:'#0f172a',margin:0}}>⚡ Energía - Gestión de Precios Base</h1>
<p style={{color:'#64748b',margin:'0.25rem 0 0'}}>Precios base por troncal y subestación</p>
</div>
<div style={{display:'flex',gap:'0.75rem',marginBottom:'1.5rem',flexWrap:'wrap'}}>
{[{label:'Ver Mapa',icon:'📍'},{label:'Exportar CSV',icon:'⬇️'},{label:'Importar CSV',icon:'⬆️'}].map(b=>(
<button key={b.label} style={{background:'white',border:'1px solid #e2e8f0',padding:'0.5rem 1rem',borderRadius:'8px',cursor:'pointer',fontWeight:500,fontSize:'0.85rem',color:'#374151'}}>{b.icon} {b.label}</button>
))}
<button style={{background:'linear-gradient(135deg,#0033A0,#0052cc)',color:'white',border:'none',padding:'0.5rem 1rem',borderRadius:'8px',cursor:'pointer',fontWeight:600,fontSize:'0.85rem',marginLeft:'auto'}}>+ Nuevo Precio</button>
</div>
<div style={{background:'#fffbeb',border:'1px solid #fbbf24',borderRadius:'12px',padding:'1rem',marginBottom:'1.5rem',display:'flex',gap:'0.75rem',alignItems:'flex-start'}}>
<span style={{fontSize:'1.25rem'}}>⚠️</span>
<div><p style={{fontWeight:700,color:'#92400e',margin:'0 0 0.25rem'}}>Información Confidencial</p><p style={{color:'#92400e',margin:0,fontSize:'0.85rem'}}>Los precios base son estratégicos y confidenciales. Solo personal autorizado puede acceder y modificar esta información.</p></div>
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem',marginBottom:'1.5rem'}}>
{[{label:'Total Ubicaciones',val:precios.length,color:'#3b82f6'},{label:'Precio Promedio',val:'$'+promedio+' USD/MWh',color:'#10b981'},{label:'Propuestas Generadas',val:precios.reduce((a,p)=>a+p.propuestas,0),color:'#8b5cf6'},{label:'Ultima Actualizacion',val:'19-01-2026',color:'#f59e0b'}].map(s=>(
<div key={s.label} style={{background:'white',borderRadius:'12px',padding:'1rem',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',borderTop:'3px solid '+s.color}}>
<p style={{fontWeight:700,fontSize:'1.25rem',color:s.color,margin:'0 0 0.25rem'}}>{s.val}</p>
<p style={{fontSize:'0.75rem',color:'#64748b',margin:0}}>{s.label}</p>
</div>
))}
</div>
<div style={{background:'white',borderRadius:'12px',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',overflow:'hidden'}}>
<div style={{padding:'1rem',borderBottom:'1px solid #f1f5f9'}}>
<h2 style={{fontWeight:700,color:'#0f172a',margin:'0 0 0.25rem',fontSize:'1rem'}}>Precios Base por Ubicación</h2>
<p style={{fontSize:'0.8rem',color:'#64748b',margin:0}}>Gestiona los precios base que se auto-completarán en las propuestas</p>
</div>
<table style={{width:'100%',borderCollapse:'collapse'}}>
<thead style={{background:'#f8fafc'}}>
<tr>{['TRONCAL','SUBESTACIÓN','REGIÓN','PRECIO BASE','PROPUESTAS','ACCIONES'].map(h=>(<th key={h} style={{padding:'0.75rem 1rem',textAlign:'left',fontSize:'0.7rem',fontWeight:700,color:'#64748b',letterSpacing:'0.05em'}}>{h}</th>))}</tr>
</thead>
<tbody>
{precios.map(p=>(
<tr key={p.id} style={{borderTop:'1px solid #f1f5f9'}}>
<td style={{padding:'0.875rem 1rem',fontSize:'0.85rem',fontWeight:500,color:'#0f172a'}}>{p.troncal}</td>
<td style={{padding:'0.875rem 1rem',fontSize:'0.8rem',color:'#475569'}}>{p.subestacion}</td>
<td style={{padding:'0.875rem 1rem'}}><span style={{background:'#dbeafe',color:'#1d4ed8',padding:'0.2rem 0.5rem',borderRadius:'999px',fontSize:'0.7rem',fontWeight:600}}>{p.region}</span></td>
<td style={{padding:'0.875rem 1rem'}}>
{editando===p.id?(
<div style={{display:'flex',gap:'0.5rem',alignItems:'center'}}>
<input type='number' value={editVal} onChange={e=>setEditVal(e.target.value)} style={{width:80,padding:'0.25rem 0.5rem',border:'1px solid #3b82f6',borderRadius:'4px',fontSize:'0.8rem'}}/>
<button onClick={()=>{setPrecios(precios.map(x=>x.id===p.id?{...x,precio:parseFloat(editVal)}:x));setEditando(null);}} style={{background:'#10b981',color:'white',border:'none',padding:'0.25rem 0.5rem',borderRadius:'4px',cursor:'pointer',fontSize:'0.75rem'}}>OK</button>
<button onClick={()=>setEditando(null)} style={{background:'#ef4444',color:'white',border:'none',padding:'0.25rem 0.5rem',borderRadius:'4px',cursor:'pointer',fontSize:'0.75rem'}}>X</button>
</div>
):(
<span style={{fontWeight:700,color:'#10b981',fontSize:'0.9rem'}}>${p.precio.toFixed(2)} USD/MWh</span>
)}
</td>
<td style={{padding:'0.875rem 1rem',fontSize:'0.8rem',color:'#475569'}}>{p.propuestas} propuestas</td>
<td style={{padding:'0.875rem 1rem'}}>
<button onClick={()=>{setEditando(p.id);setEditVal(String(p.precio));}} style={{background:'#f1f5f9',color:'#374151',border:'none',padding:'0.35rem 0.75rem',borderRadius:'6px',cursor:'pointer',fontSize:'0.75rem',fontWeight:500}}>Editar</button>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
);
}