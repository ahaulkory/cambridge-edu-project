import React from 'react';
import '../styles/main.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Bannière principale */}
      <section className="hero-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>Apprenez gratuitement avec les cours Cambridge School Certificate</h1>
              <p>Une plateforme éducative gratuite pour les étudiants préparant le School Certificate du Cambridge International Examinations.</p>
              <button className="btn btn-primary btn-lg">Découvrir les cours</button>
            </div>
            <div className="col-md-6">
              <img src="/assets/images/hero-image.jpg" alt="Étudiants qui apprennent" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      {/* Matières populaires */}
      <section className="popular-subjects">
        <div className="container">
          <h2 className="section-title">Matières populaires</h2>
          <div className="row">
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="subject-card">
                <div className="card-icon">
                  <i className="fas fa-calculator"></i>
                </div>
                <h3>Mathematics</h3>
                <p>Développez vos compétences en mathématiques avec notre programme complet.</p>
                <a href="/courses/mathematics" className="btn btn-outline-primary">Commencer</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="subject-card">
                <div className="card-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Business Studies</h3>
                <p>Apprenez les principes fondamentaux du commerce et de la gestion d'entreprise.</p>
                <a href="/courses/business-studies" className="btn btn-outline-primary">Commencer</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="subject-card">
                <div className="card-icon">
                  <i className="fas fa-book"></i>
                </div>
                <h3>English Language</h3>
                <p>Améliorez vos compétences en anglais pour réussir vos examens.</p>
                <a href="/courses/english-language" className="btn btn-outline-primary">Commencer</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="subject-card">
                <div className="card-icon">
                  <i className="fas fa-coins"></i>
                </div>
                <h3>Economics</h3>
                <p>Découvrez les principes économiques et leur application dans le monde réel.</p>
                <a href="/courses/economics" className="btn btn-outline-primary">Commencer</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="subject-card">
                <div className="card-icon">
                  <i className="fas fa-palette"></i>
                </div>
                <h3>Art & Design</h3>
                <p>Exprimez votre créativité et développez vos compétences artistiques.</p>
                <a href="/courses/art-design" className="btn btn-outline-primary">Commencer</a>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 mb-4">
              <div className="subject-card">
                <div className="card-icon">
                  <i className="fas fa-plane"></i>
                </div>
                <h3>Travel & Tourism</h3>
                <p>Explorez l'industrie du voyage et du tourisme avec notre programme complet.</p>
                <a href="/courses/travel-tourism" className="btn btn-outline-primary">Commencer</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi choisir notre plateforme */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title">Pourquoi choisir notre plateforme</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-gift"></i>
                </div>
                <h3>Gratuit</h3>
                <p>Accédez à tous nos cours et ressources gratuitement, sans frais cachés.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <h3>Contenu Officiel</h3>
                <p>Contenu basé sur le programme officiel Cambridge International Examinations.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>Adapté Mobile</h3>
                <p>Apprenez n'importe où, n'importe quand sur votre téléphone ou tablette.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
