import React,{useState}from 'react';
import{useNavigate}from 'react-router-dom';
import{useApp}from '../context/AppContext';
import{BarChart,Bar,LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer}from 'recharts';

const KANBAN_ESTADOS=['revision_interna','enviado_cliente','ganado','perdido'];
const ESTADO_LABEL:Record<string,string>={'revision_interna':'En Revisión Interna','enviado_cliente':'Enviado al Cliente','ganado':'Ganado','perdido':'Perdido'};
const ESTADO_COLOR:Record<string,string>={'revision_interna':'#f59e0b','enviado_cliente':'#3b82f6','ganado':'#10b981','perdido':'#ef4444'};

export default function Dashboard(){
const navigate=useNavigate();
const{propuestas,setPropuestas}=useApp();
const[drag,setDrag]=useState<number|null>(null);

const stats={
total:propuestas.length,
pipeline:propuestas.reduce((a,p)=>a+p.monto,0),
cierre:propuestas.length?Math.round((propuestas.filter(p=>p.estado==='ganado').length/propuestas.length)*100):0,
ghwOfrecidos:propuestas.reduce((a,p)=>a+(p.gwh||0),0),
gwhAdj:propuestas.filter(p=>p.estado==='ganado').reduce((a,p)=>a+(p.gwh||0),0),
empresas:new Set(propuestas.map(p=>p.clienteNombre)).size
};

const barData=propuestas.slice(-6).map((p,i)=>({name:'#'+(i+1),GWhOfrecidos:p.gwh||0,max:(p.gwh||0)*1.3}));
const pipelineData=['ene','feb','mar','abr','may','jun'].map((m,i)=>({
mes:m,
GWh:propuestas.filter((_,j)=>j<=i).reduce((a,p)=>a+(p.gwh||0),0),
Propuestas:propuestas.filter((_,j)=>j<=i).length
}));

const onDrop=(id:number,estado:string)=>{
setPropuestas(propuestas.map(p=>p.id===id?{...p,estado:estado as any}:p));
};

return(
<div style={{minHeight:'100vh',background:'#f8fafc',padding:'1.5rem'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'1.5rem'}}>
<div>
<h1 style={{fontSize:'1.75rem',fontWeight:700,color:'#0f172a',margin:0}}>Dashboard CRM</h1>
<p style={{color:'#64748b',margin:'0.25rem 0 0'}}>Gestión de propuestas y pipeline de ventas</p>
</div>
<button onClick={()=>navigate('/nueva-propuesta')} style={{background:'linear-gradient(135deg,#0033A0,#0052cc)',color:'white',border:'none',padding:'0.625rem 1.25rem',borderRadius:'8px',cursor:'pointer',fontWeight:600,fontSize:'0.95rem',display:'flex',alignItems:'center',gap:'0.5rem'}}>+ Nueva Propuesta</button>
</div>

<div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'1rem',marginBottom:'1.5rem'}}>
<div style={{background:'white',borderRadius:'12px',padding:'1.25rem',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
<p style={{fontSize:'0.75rem',color:'#64748b',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 0.5rem'}}>⚡ GWh por Propuesta (Últimas 6)</p>
<ResponsiveContainer width='100%' height={200}>
<BarChart data={barData}>
<CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9'/>
<XAxis dataKey='name' tick={{fontSize:11}}/>
<YAxis tick={{fontSize:11}}/>
<Tooltip/>
<Legend/>
<Bar dataKey='max' fill='#cbd5e1' name='Capacidad Max' radius={[4,4,0,0]}/>
<Bar dataKey='GWhOfrecidos' fill='#3b82f6' radius={[4,4,0,0]}/>
</BarChart>
</ResponsiveContainer>
</div>
<div style={{background:'white',borderRadius:'12px',padding:'1.25rem',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
<p style={{fontSize:'0.75rem',color:'#64748b',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 0.5rem'}}>📈 Pipeline Mensual</p>
<ResponsiveContainer width='100%' height={200}>
<LineChart data={pipelineData}>
<CartesianGrid strokeDasharray='3 3' stroke='#f1f5f9'/>
<XAxis dataKey='mes' tick={{fontSize:11}}/>
<YAxis yAxisId='left' tick={{fontSize:11}}/>
<YAxis yAxisId='right' orientation='right' tick={{fontSize:11}}/>
<Tooltip/>
<Legend/>
<Line yAxisId='left' type='monotone' dataKey='GWh' stroke='#3b82f6' strokeWidth={2} dot={{r:4}}/>
<Line yAxisId='right' type='monotone' dataKey='Propuestas' stroke='#10b981' strokeWidth={2} dot={{r:4}}/>
</LineChart>
</ResponsiveContainer>
</div>
</div>

<div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'0.75rem',marginBottom:'1.5rem'}}>
{[{label:'Total Propuestas',val:stats.total,color:'#3b82f6'},{label:'Valor Pipeline',val:'$'+stats.pipeline.toLocaleString('es-CL'),color:'#10b981'},{label:'Tasa de Cierre',val:stats.cierre+'%',color:'#8b5cf6'},{label:'GWh Ofrecidos',val:stats.ghwOfrecidos.toFixed(2)+' GWh',color:'#f59e0b'},{label:'GWh Adjudicados',val:stats.gwhAdj.toFixed(2)+' GWh',color:'#06b6d4'},{label:'Empresas Únicas',val:stats.empresas,color:'#ec4899'}].map(s=>(
<div key={s.label} style={{background:'white',borderRadius:'12px',padding:'1rem',boxShadow:'0 1px 3px rgba(0,0,0,0.08)',textAlign:'center',borderTop:'3px solid '+s.color}}>
<p style={{fontSize:'1.5rem',fontWeight:700,color:s.color,margin:'0 0 0.25rem'}}>{s.val}</p>
<p style={{fontSize:'0.7rem',color:'#64748b',margin:0,fontWeight:500}}>{s.label}</p>
</div>
))}
</div>

<div style={{background:'white',borderRadius:'12px',padding:'1.25rem',boxShadow:'0 1px 3px rgba(0,0,0,0.08)'}}>
<div style={{marginBottom:'1rem'}}>
<h2 style={{fontSize:'1rem',fontWeight:700,color:'#0f172a',margin:'0 0 0.25rem'}}>Pipeline de Ventas</h2>
<p style={{fontSize:'0.8rem',color:'#64748b',margin:0}}>Gestiona el estado de tus propuestas con drag & drop</p>
</div>
<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1rem'}}>
{KANBAN_ESTADOS.map(estado=>(
<div key={estado} onDragOver={e=>e.preventDefault()} onDrop={()=>drag!==null&&onDrop(drag,estado)} style={{background:'#f8fafc',borderRadius:'8px',padding:'0.75rem',minHeight:'200px'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
<h3 style={{fontSize:'0.8rem',fontWeight:700,color:'#374151',margin:0}}>{ESTADO_LABEL[estado]}</h3>
<span style={{background:ESTADO_COLOR[estado],color:'white',borderRadius:'999px',padding:'0.1rem 0.5rem',fontSize:'0.7rem',fontWeight:700}}>{propuestas.filter(p=>p.estado===estado).length}</span>
</div>
{propuestas.filter(p=>p.estado===estado).length===0&&(
<div style={{textAlign:'center',color:'#94a3b8',fontSize:'0.75rem',padding:'1rem 0'}}>No hay propuestas</div>
)}
{propuestas.filter(p=>p.estado===estado).map(p=>(
<div key={p.id} draggable onDragStart={()=>setDrag(p.id)} onDragEnd={()=>setDrag(null)} style={{background:'white',borderRadius:'8px',padding:'0.75rem',marginBottom:'0.5rem',boxShadow:'0 1px 2px rgba(0,0,0,0.08)',cursor:'grab',borderLeft:'3px solid '+ESTADO_COLOR[estado]}}>
<p style={{fontWeight:600,fontSize:'0.8rem',color:'#0f172a',margin:'0 0 0.25rem'}}>{p.clienteNombre}</p>
<p style={{fontSize:'0.7rem',color:'#64748b',margin:'0 0 0.4rem'}}># {p.id}</p>
<div style={{display:'flex',justifyContent:'space-between',fontSize:'0.7rem',color:'#475569'}}>
<span>Monto: ${p.monto.toLocaleString('es-CL')}</span>
<span>{p.gwh} GWh</span>
</div>
<p style={{fontSize:'0.65rem',color:'#94a3b8',margin:'0.25rem 0 0'}}>{p.fechaCreacion}</p>
</div>
))}
</div>
))}
</div>
</div>
</div>
);
}