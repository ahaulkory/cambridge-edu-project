import React, { useState } from 'react';
import '../styles/main.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message envoyé:', formData);
    // Dans une implémentation réelle, nous enverrions ces données au backend
    
    // Réinitialiser le formulaire après envoi
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      agreeTerms: false
    });
    
    // Afficher un message de confirmation
    alert('Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.');
  };

  return (
    <div className="contact-container">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h1 className="text-center mb-5">Contactez-nous</h1>
            
            <div className="row">
              {/* Informations de contact */}
              <div className="col-md-4 mb-4 mb-md-0">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Nos coordonnées</h5>
                    <hr />
                    <div className="contact-info">
                      <div className="mb-3">
                        <i className="fas fa-envelope me-2 text-primary"></i>
                        <span>contact@cambridge-edu.com</span>
                      </div>
                      <div className="mb-3">
                        <i className="fas fa-phone me-2 text-primary"></i>
                        <span>+230 123 4567</span>
                      </div>
                      <div className="mb-3">
                        <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                        <span>123 Rue des Écoles, Port Louis, Maurice</span>
                      </div>
                    </div>
                    
                    <h5 className="mt-4">Suivez-nous</h5>
                    <hr />
                    <div className="social-links">
                      <a href="#" className="btn btn-outline-primary me-2">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="#" className="btn btn-outline-primary me-2">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="#" className="btn btn-outline-primary me-2">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="#" className="btn btn-outline-primary">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Formulaire de contact */}
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Envoyez-nous un message</h5>
                    <p className="text-muted">
                      Vous avez des questions sur nos cours ou besoin d'assistance ? 
                      N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
                    </p>
                    <hr />
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nom complet</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Sujet</label>
                        <select
                          className="form-select"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Sélectionner un sujet</option>
                          <option value="question">Question générale</option>
                          <option value="support">Support technique</option>
                          <option value="feedback">Commentaires et suggestions</option>
                          <option value="partnership">Partenariat</option>
                          <option value="other">Autre</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="agreeTerms"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          required
                        />
                        <label className="form-check-label" htmlFor="agreeTerms">
                          J'accepte que mes données soient traitées conformément à la 
                          <a href="#" className="text-decoration-none"> politique de confidentialité</a>
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-paper-plane me-2"></i>Envoyer le message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ */}
            <div className="faq-section mt-5">
              <h2 className="text-center mb-4">Questions fréquemment posées</h2>
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Les cours sont-ils vraiment gratuits ?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Oui, tous les cours sur notre plateforme sont entièrement gratuits. Notre mission est de rendre l'éducation accessible à tous les étudiants préparant le Cambridge School Certificate.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Comment puis-je accéder aux examens passés ?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Les examens passés sont disponibles dans la section "Ressources" de chaque cours. Vous pouvez les télécharger au format PDF et les imprimer pour vous entraîner.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Le contenu est-il conforme au programme officiel Cambridge ?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Absolument. Tout notre contenu est basé sur le programme officiel Cambridge International Examinations 2023-2025. Nous mettons régulièrement à jour nos cours pour refléter les changements dans le curriculum.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      Comment puis-je suivre ma progression ?
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Une fois inscrit et connecté, vous pouvez suivre votre progression pour chaque cours et module dans votre profil utilisateur. Des barres de progression visuelles vous montrent votre avancement.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
