import React, { useState, useContext, createContext } from 'react';
import { authService } from '../services/api';

// Création du contexte d'authentification
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

// Fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction d'inscription
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      setCurrentUser(response.user);
      setLoading(false);
      return response;
    } catch (error) {
      setError(error.message || 'Une erreur est survenue lors de l\'inscription');
      setLoading(false);
      throw error;
    }
  };

  // Fonction de connexion
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      setCurrentUser(response.user);
      setLoading(false);
      return response;
    } catch (error) {
      setError(error.message || 'Identifiants invalides');
      setLoading(false);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Vérifier si l'utilisateur est un administrateur
  const isAdmin = () => {
    return currentUser && currentUser.role === 'admin';
  };

  // Valeur du contexte
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    logout,
    isAdmin,
    isAuthenticated: authService.isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
