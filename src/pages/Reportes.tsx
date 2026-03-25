import {useState} from 'react';
import{useApp}from '../context/AppContext';

export default function Reportes(){
const{propuestas}=useApp();
const[tab,setTab]=useState('reportes');
const[cols,setCols]=useState({id:true,estado:true,fecha:true,anios:false,extras:false,cliente:true,rut:false,dir:false,monto:true,gwh:false});
const[filtros,setFiltros]=useState({cliente:'',montoMin:'',montoMax:''});
const colLabel={id:'ID Propuesta',estado:'Estado',fecha:'Fecha Creacion',anios:'Anos Contrato',extras:'Servicios Extra',cliente:'Cliente',rut:'RUT',dir:'Direccion',monto:'Monto Total',gwh:'GWh Ofrecidos'};
const grupos={Propuesta:['id','estado','fecha','anios','extras'],Cliente:['cliente','rut','dir'],Financiero:['monto'],Tecnico:['gwh']};
const filtradas=propuestas.filter(p=>(!filtros.cliente||p.clienteNombre.toLowerCase().includes(filtros.cliente.toLowerCase()))&&(!filtros.montoMin||p.monto>=Number(filtros.montoMin))&&(!filtros.montoMax||p.monto<=Number(filtros.montoMax)));
const ESTADO_LABEL={revision_interna:'Revision Interna',enviado_cliente:'Enviada a Cliente',ganado:'Ganado',perdido:'Perdido'};
return(
<div className="page-container" style={{maxWidth:'1200px',margin:'0 auto'}}>
<div style={{marginBottom:'2rem'}}>
<h1 style={{fontSize:'1.75rem',fontWeight:700,color:'#0f172a'}}>📊 Reportes e Integracion Salesforce</h1>
<p style={{color:'#64748b',marginTop:'0.25rem'}}>Genera reportes personalizados y gestiona la migracion a Salesforce</p>
</div>
<div style={{borderBottom:'2px solid #e2e8f0',marginBottom:'1.5rem',display:'flex',flexWrap:'wrap'}}>
{(['reportes','salesforce']).map(t=>(
<button key={t} onClick={()=>setTab(t)} style={{padding:'0.625rem 1.5rem',border:'none',background:'none',cursor:'pointer',fontWeight:tab===t?700:400,color:tab===t?'#0033A0':'#64748b',borderBottom:tab===t?'2px solid #0033A0':'none',marginBottom:'-2px',fontSize:'0.9rem'}}>{t==='reportes'?'📄 Reportes Personalizados':'✅ Migracion Salesforce'}</button>
))}
</div>
{tab==='reportes'&&(
<div className="grid-reportes">
<div>
<div style={{background:'white',borderRadius:'12px',padding:'1.25rem',boxShadow:'0 1px 3px rgba(0,0,0,0.1)',marginBottom:'1rem'}}>
<h3 style={{fontSize:'0.9rem',fontWeight:700,marginBottom:'0.5rem',color:'#0f172a'}}>Columnas del Reporte</h3>
{Object.entries(grupos).map(([g,keys])=>(
<div key={g} style={{marginBottom:'0.5rem'}}>
<p style={{fontSize:'0.75rem',fontWeight:600,color:'#0033A0',marginBottom:'0.25rem'}}>{g}</p>
{keys.map(k=>(
<label key={k} style={{display:'flex',alignItems:'center',gap:'0.5rem',fontSize:'0.8rem',color:'#374151',marginBottom:'0.25rem',cursor:'pointer'}}>
<input type="checkbox" checked={!!cols[k as keyof typeof cols]} onChange={()=>setCols({...cols,[k as keyof typeof cols]:!cols[k as keyof typeof cols]})} style={{accentColor:'#0033A0',width:14,height:14}}/>
{colLabel[k as keyof typeof colLabel]}
</label>
))}
</div>
))}
</div>
<div style={{background:'white',borderRadius:'12px',padding:'1.25rem',boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
<h3 style={{fontSize:'0.9rem',fontWeight:700,marginBottom:'0.75rem',color:'#0f172a'}}>Filtros Avanzados</h3>
<label style={{fontSize:'0.75rem',color:'#64748b',display:'block'}}>Nombre Cliente</label>
<input value={filtros.cliente} onChange={e=>setFiltros({...filtros,cliente:e.target.value})} placeholder='Buscar por cliente...' style={{width:'100%',padding:'0.5rem',border:'1px solid #e2e8f0',borderRadius:'6px',fontSize:'0.8rem',marginBottom:'0.5rem',boxSizing:'border-box'}}/>
<label style={{fontSize:'0.75rem',color:'#64748b',display:'block'}}>Monto Minimo</label>
<input type="number" value={filtros.montoMin} onChange={e=>setFiltros({...filtros,montoMin:e.target.value})} style={{width:'100%',padding:'0.5rem',border:'1px solid #e2e8f0',borderRadius:'6px',fontSize:'0.8rem',marginBottom:'0.5rem',boxSizing:'border-box'}}/>
<label style={{fontSize:'0.75rem',color:'#64748b',display:'block'}}>Monto Maximo</label>
<input type="number" value={filtros.montoMax} onChange={e=>setFiltros({...filtros,montoMax:e.target.value})} style={{width:'100%',padding:'0.5rem',border:'1px solid #e2e8f0',borderRadius:'6px',fontSize:'0.8rem',marginBottom:'0.5rem',boxSizing:'border-box'}}/>
<button onClick={()=>setFiltros({cliente:'',montoMin:'',montoMax:''})} style={{width:'100%',padding:'0.5rem',border:'1px solid #e2e8f0',borderRadius:'6px',background:'white',cursor:'pointer',fontSize:'0.8rem',color:'#64748b'}}>Limpiar Filtros</button>
</div>
</div>
<div style={{background:'white',borderRadius:'12px',padding:'1.5rem',boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1rem',flexWrap:'wrap',gap:'0.5rem'}}>
<h3 style={{fontSize:'1rem',fontWeight:700,color:'#0f172a'}}>Vista Previa <span style={{background:'#e0f2fe',color:'#0369a1',borderRadius:'9999px',padding:'0.125rem 0.5rem',fontSize:'0.75rem'}}>{filtradas.length}</span></h3>
<div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap'}}>
<button style={{padding:'0.5rem 1rem',border:'1px solid #e2e8f0',borderRadius:'6px',background:'white',cursor:'pointer',fontSize:'0.8rem'}}>Guardar Reporte</button>
<button style={{padding:'0.5rem 1rem',border:'none',borderRadius:'6px',background:'#0033A0',color:'white',cursor:'pointer',fontSize:'0.8rem'}}>Exportar CSV</button>
</div>
</div>
<div style={{overflowX:'auto'}}>
<table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.85rem',minWidth:500}}>
<thead><tr style={{background:'#f8fafc'}}>
{Object.entries(cols).filter(([,v])=>v).map(([k])=>(<th key={k} style={{padding:'0.75rem 1rem',textAlign:'left',fontWeight:600,color:'#64748b',fontSize:'0.75rem',textTransform:'uppercase',borderBottom:'1px solid #e2e8f0',whiteSpace:'nowrap'}}>{colLabel[k as keyof typeof colLabel]}</th>))}
<th style={{padding:'0.75rem 1rem',textAlign:'left',fontWeight:600,color:'#64748b',fontSize:'0.75rem',textTransform:'uppercase',borderBottom:'1px solid #e2e8f0',whiteSpace:'nowrap'}}>ACCIONES</th>
</tr></thead>
<tbody>
{filtradas.map(p=>(
<tr key={p.id} style={{borderBottom:'1px solid #f1f5f9'}}>
{cols.id&&<td style={{padding:'0.75rem 1rem',color:'#0033A0',fontWeight:600,whiteSpace:'nowrap'}}>#{p.id}</td>}
{cols.estado&&<td style={{padding:'0.75rem 1rem'}}><span style={{padding:'0.25rem 0.5rem',borderRadius:'9999px',fontSize:'0.75rem',fontWeight:600,background:p.estado==='ganado'?'#dcfce7':p.estado==='perdido'?'#fee2e2':'#fef9c3',color:p.estado==='ganado'?'#166534':p.estado==='perdido'?'#991b1b':'#854d0e',whiteSpace:'nowrap'}}>{ESTADO_LABEL[p.estado as keyof typeof ESTADO_LABEL]||p.estado}</span></td>}
{cols.fecha&&<td style={{padding:'0.75rem 1rem',color:'#64748b',whiteSpace:'nowrap'}}>{p.fechaCreacion}</td>}
{cols.anios&&<td style={{padding:'0.75rem 1rem',color:'#64748b'}}>{p.aniosContrato} años</td>}
{cols.extras&&<td style={{padding:'0.75rem 1rem',color:'#64748b'}}>{p.serviciosExtras.join(', ')||'-'}</td>}
{cols.cliente&&<td style={{padding:'0.75rem 1rem',fontWeight:500,whiteSpace:'nowrap'}}>{p.clienteNombre}</td>}
{cols.rut&&<td style={{padding:'0.75rem 1rem',color:'#64748b'}}>{p.clienteRut||'-'}</td>}
{cols.dir&&<td style={{padding:'0.75rem 1rem',color:'#64748b'}}>{p.clienteDireccion||'-'}</td>}
{cols.monto&&<td style={{padding:'0.75rem 1rem',fontWeight:600,whiteSpace:'nowrap'}}>${p.monto.toLocaleString('es-CL')}</td>}
{cols.gwh&&<td style={{padding:'0.75rem 1rem',color:'#64748b'}}>{p.gwh||'-'}</td>}
<td style={{padding:'0.75rem 1rem'}}><button style={{padding:'0.25rem 0.75rem',border:'1px solid #0033A0',borderRadius:'6px',background:'white',color:'#0033A0',cursor:'pointer',fontSize:'0.75rem',whiteSpace:'nowrap'}}>Crear Ticket SF</button></td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
)}
{tab==='salesforce'&&(
<div style={{background:'white',borderRadius:'12px',padding:'2rem',boxShadow:'0 1px 3px rgba(0,0,0,0.1)',maxWidth:'600px'}}>
<div style={{textAlign:'center'}}>
<div style={{fontSize:'3rem'}}>☁️</div>
<h2 style={{fontWeight:700,color:'#0f172a',marginBottom:'0.5rem'}}>Integracion Salesforce</h2>
<p style={{color:'#64748b',marginBottom:'1.5rem'}}>{propuestas.filter(p=>p.estado==='enviado_cliente').length} propuesta(s) lista(s) para migrar</p>
<button style={{background:'#0033A0',color:'white',border:'none',borderRadius:'8px',padding:'0.75rem 2rem',cursor:'pointer',fontSize:'1rem',fontWeight:600}}>Iniciar Migracion</button>
</div>
</div>
)}
</div>
);
}