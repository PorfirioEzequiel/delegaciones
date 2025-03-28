import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardDelegacion from './pages/DashboardDelegacion';
import Registro from './pages/Registro';


// Componente para proteger rutas privadas
const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem('user');
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route path="/admin/:usuario" element={<PrivateRoute><DashboardAdmin /></PrivateRoute>} />
        <Route path="/delegacion/:usuario" element={<PrivateRoute><Registro /></PrivateRoute>} />
        <Route path="/reporte" element={<PrivateRoute><Registro /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
