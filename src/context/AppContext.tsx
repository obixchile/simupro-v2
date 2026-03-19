import React,{createContext,useContext,useState}from'react';
import{mockPropuestas,mockClientes,mockPrecios,mockUsuarios,mockTickets}from'../data/mockData';
import type{Propuesta,Cliente,PrecioBase,Usuario,TicketSalesforce}from'../types';
interface Ctx{propuestas:Propuesta[];setPropuestas:React.Dispatch<React.SetStateAction<Propuesta[]>>;clientes:Cliente[];setClientes:React.Dispatch<React.SetStateAction<Cliente[]>>;precios:PrecioBase[];setPrecios:React.Dispatch<React.SetStateAction<PrecioBase[]>>;usuarios:Usuario[];setUsuarios:React.Dispatch<React.SetStateAction<Usuario[]>>;tickets:TicketSalesforce[];setTickets:React.Dispatch<React.SetStateAction<TicketSalesforce[]>>;user:{nombre:string;email:string;rol:string}|null;setUser:React.Dispatch<React.SetStateAction<{nombre:string;email:string;rol:string}|null>>;}
const AppContext=createContext<Ctx|null>(null);
export const AppProvider=({children}:{children:React.ReactNode})=>{
  const[propuestas,setPropuestas]=useState<Propuesta[]>(mockPropuestas);
  const[clientes,setClientes]=useState<Cliente[]>(mockClientes);
  const[precios,setPrecios]=useState<PrecioBase[]>(mockPrecios);
  const[usuarios,setUsuarios]=useState<Usuario[]>(mockUsuarios);
  const[tickets,setTickets]=useState<TicketSalesforce[]>(mockTickets);
  const[user,setUser]=useState<{nombre:string;email:string;rol:string}|null>(null);
  return(<AppContext.Provider value={{propuestas,setPropuestas,clientes,setClientes,precios,setPrecios,usuarios,setUsuarios,tickets,setTickets,user,setUser}}>{children}</AppContext.Provider>);
};
export const useApp=()=>{const c=useContext(AppContext);if(!c)throw new Error('no ctx');return c;};