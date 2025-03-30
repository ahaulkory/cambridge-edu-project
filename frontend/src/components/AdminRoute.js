import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Composant pour protéger les routes qui nécessitent des privilèges d'administrateur
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  return isAdmin() ? children : <Navigate to="/" />;
};

export default AdminRoute;
