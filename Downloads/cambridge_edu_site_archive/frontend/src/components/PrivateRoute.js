import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Composant pour protéger les routes qui nécessitent une authentification
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
