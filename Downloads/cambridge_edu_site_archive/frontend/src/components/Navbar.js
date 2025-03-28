import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/main.css';

const Navbar = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/assets/images/logo.png" alt="Cambridge Edu" height="40" />
          <span className="ms-2 fw-bold">Cambridge Edu</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Cours</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            {isAdmin && currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Administration</Link>
              </li>
            )}
          </ul>
          
          <div className="d-flex">
            {currentUser ? (
              <>
                <div className="dropdown">
                  <button 
                    className="btn btn-outline-primary dropdown-toggle" 
                    type="button" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    {currentUser.firstName} {currentUser.lastName}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="fas fa-user me-2"></i>Mon profil
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/courses">
                        <i className="fas fa-book me-2"></i>Mes cours
                      </Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link className="dropdown-item" to="/admin">
                          <i className="fas fa-cog me-2"></i>Administration
                        </Link>
                      </li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt me-2"></i>Déconnexion
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary me-2">Connexion</Link>
                <Link to="/register" className="btn btn-primary">Inscription</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
