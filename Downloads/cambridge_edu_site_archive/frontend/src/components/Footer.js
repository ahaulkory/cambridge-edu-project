import React from 'react';
import '../styles/main.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-auto py-4 bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Cambridge Edu</h5>
            <p className="text-muted">
              Une plateforme éducative gratuite pour les étudiants préparant le School Certificate 
              du Cambridge International Examinations.
            </p>
          </div>
          
          <div className="col-md-2 mb-3 mb-md-0">
            <h5>Liens rapides</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-muted">Accueil</a></li>
              <li><a href="/courses" className="text-decoration-none text-muted">Cours</a></li>
              <li><a href="/contact" className="text-decoration-none text-muted">Contact</a></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-3 mb-md-0">
            <h5>Ressources</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-muted">Cambridge International</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Examens passés</a></li>
              <li><a href="#" className="text-decoration-none text-muted">Syllabus officiels</a></li>
            </ul>
          </div>
          
          <div className="col-md-3">
            <h5>Nous contacter</h5>
            <ul className="list-unstyled">
              <li className="text-muted"><i className="fas fa-envelope me-2"></i>contact@cambridge-edu.com</li>
              <li className="text-muted mt-2">
                <div className="social-icons">
                  <a href="#" className="text-decoration-none text-muted me-2"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="text-decoration-none text-muted me-2"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="text-decoration-none text-muted me-2"><i className="fab fa-instagram"></i></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-3 bg-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {currentYear} Cambridge Edu. Tous droits réservés.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-muted">Mentions légales</a>
              </li>
              <li className="list-inline-item">
                <span className="text-muted mx-1">|</span>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-decoration-none text-muted">Politique de confidentialité</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
