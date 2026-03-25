import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NuevaPropuesta from './pages/NuevaPropuesta';
import Clientes from './pages/Clientes';
import Energia from './pages/Energia';
import Reportes from './pages/Reportes';
import Configuracion from './pages/Configuracion';
import Sidebar from './components/Sidebar';

function AppInner() {
  const { user, setUser } = useApp();

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar onLogout={() => setUser(null)} />
      <main className="app-main flex-1 overflow-y-auto p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/nueva-propuesta" element={<NuevaPropuesta />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/energia" element={<Energia />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/configuracion" element={<Configuracion />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppInner />
      </Router>
    </AppProvider>
  );
}