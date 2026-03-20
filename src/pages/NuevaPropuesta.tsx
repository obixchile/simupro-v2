import React,{useState}from 'react';
import{useApp}from '../context/AppContext';
import{Plus,Save,ArrowRight,Upload,ChevronRight,FileText,Zap,Shield,BarChart3}from 'lucide-react';
export default function NuevaPropuesta(){
const{addPropuesta}=useApp();
const[step,setStep]=useState(1);
const[formData,setFormData]=useState({clienteNombre:'',clienteRut:'',clienteEmail:'',clienteTel:'',clienteDireccion:'',sucursales:[{id:1,nombre:'',direccion:'',precioBase:120.5,potencia:500,costoActual:0,troncal:'',subestacion:''}],aniosContrato:3,autogeneracion:false,serviciosExtra:[]});
const extras=[{id:'mantenimiento',label:'Mantenimiento Preventivo',price:500000,icon:<Shield size={18}/>},{id:'monitoreo',label:'Monitoreo 24/7 Power BI',price:300000,icon:<BarChart3 size={18}/>},{id:'eficiencia',label:'Auditoria Eficiencia Energetica',price:1200000,icon:<Zap size={18}/>}];
const totalGWh=formData.sucursales.reduce((acc,s)=>acc+(Number(s.potencia)*8760*0.6)/1000000,0);
const totalExtras=formData.serviciosExtra.reduce((acc,id)=>acc+(extras.find(e=>e.id===id)?.price||0),0);
const handleSave=()=>{
addPropuesta({...formData,id:Date.now(),estado:'revision_interna',monto:totalExtras,gwh:totalGWh,fechaCreacion:new Date().toLocaleDateString()});
alert('Propuesta guardada exitosamente');
};
return(
<div style={{padding:'2rem',maxWidth:'1200px',margin:'0 auto'}}>
<div style={{marginBottom:'2rem',textAlign:'center'}}>
<h1 style={{fontSize:'2rem',fontWeight:800,color:'#0f172a'}}>Nueva Propuesta</h1>
<p style={{color:'#64748b'}}>Crea una cotizacion de suministro electrico</p>
</div>
<div style={{display:'flex',justifyContent:'center',gap:'3rem',marginBottom:'2.5rem'}}>
<div style={{display:'flex',alignItems:'center',gap:'0.75rem',color:step===1?'#0033A0':'#94a3b8',fontWeight:600}}>
<span style={{width:32,height:32,borderRadius:'50%',background:step===1?'#0033A0':'#e2e8f0',color:step===1?'white':'#64748b',display:'flex',alignItems:'center',justifyContent:'center'}}>1</span> Datos y Sucursales
</div>
<ChevronRight size={20} color='#94a3b8'/>
<div style={{display:'flex',alignItems:'center',gap:'0.75rem',color:step===2?'#0033A0':'#94a3b8',fontWeight:600}}>
<span style={{width:32,height:32,borderRadius:'50%',background:step===2?'#0033A0':'#e2e8f0',color:step===2?'white':'#64748b',display:'flex',alignItems:'center',justifyContent:'center'}}>2</span> Servicios Extras
</div>
</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 350px',gap:'2rem'}}>
<div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
 {step===1?(
  <div style={{background:'white',borderRadius:'16px',padding:'2rem',boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'}}>
   <h3 style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'1.5rem',display:'flex',alignItems:'center',gap:'0.5rem'}}><FileText color='#0033A0'/> Datos del Cliente</h3>
   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
    <div><label style={{fontSize:'0.85rem',fontWeight:600,display:'block',marginBottom:'0.4rem'}}>Razon Social *</label><input style={{width:'100%',padding:'0.75rem',borderRadius:'8px',border:'1px solid #e2e8f0'}} placeholder='Ej: Empresa S.A.' value={formData.clienteNombre} onChange={e=>setFormData({...formData,clienteNombre:e.target.value})}/></div>
    <div><label style={{fontSize:'0.85rem',fontWeight:600,display:'block',marginBottom:'0.4rem'}}>RUT *</label><input style={{width:'100%',padding:'0.75rem',borderRadius:'8px',border:'1px solid #e2e8f0'}} placeholder='76.123.456-7'/></div>
   </div>
   <h3 style={{fontSize:'1.1rem',fontWeight:700,marginTop:'2rem',marginBottom:'1.5rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>Datos Tecnicos <button style={{fontSize:'0.85rem',padding:'0.5rem 1rem',background:'#0033A0',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>+ Agregar Sucursal</button></h3>
   {formData.sucursales.map(s=>(
    <div key={s.id} style={{padding:'1.5rem',border:'1px solid #e2e8f0',borderRadius:'12px',marginBottom:'1rem'}}>
     <p style={{fontWeight:700,marginBottom:'1rem'}}>Sucursal {s.id}</p>
     <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
      <input style={{width:'100%',padding:'0.75rem',borderRadius:'8px',border:'1px solid #e2e8f0'}} placeholder='Nombre Sucursal'/>
      <input style={{width:'100%',padding:'0.75rem',borderRadius:'8px',border:'1px solid #e2e8f0'}} placeholder='Direccion'/>
      <input type='number' style={{width:'100%',padding:'0.75rem',borderRadius:'8px',border:'1px solid #e2e8f0'}} placeholder='Precio Base (USD/MWh)'/>
      <input type='number' style={{width:'100%',padding:'0.75rem',borderRadius:'8px',border:'1px solid #e2e8f0'}} placeholder='Potencia (kW)' onChange={e=>{
       const news=[...formData.sucursales]; news[0].potencia=Number(e.target.value); setFormData({...formData,sucursales:news});
      }}/>
     </div>
    </div>
   ))}
  </div>
 ):(
  <div style={{background:'white',borderRadius:'16px',padding:'2rem',boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)'}}>
   <h3 style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'1.5rem'}}>Selecciona Servicios Adicionales</h3>
   {extras.map(e=>(
    <label key={e.id} style={{display:'flex',alignItems:'center',gap:'1rem',padding:'1.25rem',border:'1px solid #e2e8f0',borderRadius:'12px',marginBottom:'1rem',cursor:'pointer'}}>
     <input type='checkbox' checked={formData.serviciosExtra.includes(e.id)} onChange={()=>{
      const next=formData.serviciosExtra.includes(e.id)?formData.serviciosExtra.filter(x=>x!==e.id):[...formData.serviciosExtra,e.id];
      setFormData({...formData,serviciosExtra:next});
     }} style={{width:20,height:20}}/>
     <div style={{width:40,height:40,background:'#eff6ff',borderRadius:'8px',display:'flex',alignItems:'center',justifyContent:'center',color:'#0033A0'}}>{e.icon}</div>
     <div style={{flex:1}}><p style={{fontWeight:600}}>{e.label}</p><p style={{fontSize:'0.8rem',color:'#64748b'}}>Incluye soporte tecnico y reportes mensuales</p></div>
     <div style={{fontWeight:700}}>${e.price.toLocaleString('es-CL')}</div>
    </label>
   ))}
  </div>
 )}
</div>
<div style={{display:'flex',flexDirection:'column',gap:'1.5rem'}}>
 <div style={{background:'linear-gradient(135deg,#0f172a,#1e293b)',color:'white',borderRadius:'16px',padding:'1.5rem',boxShadow:'0 10px 15px -3px rgba(0,0,0,0.1)'}}>
  <h3 style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'1.25rem',borderBottom:'1px solid rgba(255,255,255,0.1)',paddingBottom:'0.75rem'}}>Resumen Proyectado</h3>
  <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
   <div style={{display:'flex',justifyContent:'space-between'}}><span style={{opacity:0.8}}>Total GWh Proyectado</span><span style={{fontWeight:700}}>{totalGWh.toFixed(2)} GWh</span></div>
   <div style={{display:'flex',justifyContent:'space-between'}}><span style={{opacity:0.8}}>Servicios Extras</span><span style={{fontWeight:700}}>${totalExtras.toLocaleString('es-CL')}</span></div>
   <div style={{marginTop:'1rem',paddingTop:'1rem',borderTop:'1px solid rgba(255,255,255,0.2)',textAlign:'center'}}>
    <p style={{fontSize:'0.8rem',opacity:0.8,marginBottom:'0.25rem'}}>AHORRO ANUAL ESTIMADO</p>
    <p style={{fontSize:'2.25rem',fontWeight:800,color:'#22c55e'}}>$12.450.000</p>
    <p style={{color:'#22c55e',fontWeight:600}}>+ 15.4%</p>
   </div>
  </div>
 </div>
 <div style={{display:'flex',flexDirection:'column',gap:'0.75rem'}}>
  <button onClick={handleSave} style={{width:'100%',padding:'1rem',background:'white',border:'1px solid #e2e8f0',borderRadius:'12px',fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem'}}><Save size={18}/> Guardar Borrador</button>
  {step===1?(
   <button onClick={()=>setStep(2)} style={{width:'100%',padding:'1rem',background:'#0033A0',color:'white',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem'}}>Continuar <ArrowRight size={18}/></button>
  ):(
   <button onClick={()=>alert('Propuesta Finalizada')} style={{width:'100%',padding:'1rem',background:'#22c55e',color:'white',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer'}}>Finalizar y Enviar</button>
  )}
 </div>
</div>
</div>
</div>
);
}