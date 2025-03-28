import React, { useState } from 'react';
import '../styles/main.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('info');
  
  // Données simulées de l'utilisateur
  const userData = {
    firstName: 'Thomas',
    lastName: 'Dubois',
    email: 'thomas.dubois@example.com',
    profileImage: '/assets/images/profile-placeholder.jpg',
    enrolledCourses: [
      { id: 'mathematics', title: 'Mathematics (Syllabus D)', progress: 40 },
      { id: 'business-studies', title: 'Business Studies', progress: 75 },
      { id: 'english-language', title: 'English Language', progress: 30 }
    ],
    completedCourses: [
      { id: 'economics', title: 'Economics', completedDate: '15/02/2025' }
    ],
    achievements: [
      { id: 1, title: 'Premier cours terminé', icon: 'trophy', date: '15/02/2025' },
      { id: 2, title: '5 modules terminés', icon: 'star', date: '01/03/2025' },
      { id: 3, title: 'Série parfaite dans un quiz', icon: 'award', date: '10/03/2025' }
    ]
  };
  
  // État pour le formulaire de modification du profil
  const [profileForm, setProfileForm] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Gestion du formulaire de modification du profil
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Vérifier si les mots de passe correspondent
    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }
    console.log('Mise à jour du profil avec:', profileForm);
    // Dans une implémentation réelle, nous enverrions ces données au backend
  };

  return (
    <div className="profile-container">
      <div className="container py-5">
        <div className="row">
          {/* Sidebar du profil */}
          <div className="col-lg-3">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img 
                  src={userData.profileImage} 
                  alt="Photo de profil" 
                  className="rounded-circle img-fluid" 
                  style={{ width: '150px' }}
                />
                <h5 className="my-3">{userData.firstName} {userData.lastName}</h5>
                <p className="text-muted mb-1">Étudiant</p>
                <p className="text-muted mb-4">Cambridge School Certificate</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-outline-primary">Modifier la photo</button>
                </div>
              </div>
            </div>
            
            <div className="card mb-4">
              <div className="card-body">
                <ul className="nav flex-column nav-pills">
                  <li className="nav-item">
                    <button 
                      className={`nav-link text-start w-100 ${activeTab === 'info' ? 'active' : ''}`}
                      onClick={() => setActiveTab('info')}
                    >
                      <i className="fas fa-user me-2"></i>Informations personnelles
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link text-start w-100 ${activeTab === 'courses' ? 'active' : ''}`}
                      onClick={() => setActiveTab('courses')}
                    >
                      <i className="fas fa-book me-2"></i>Mes cours
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link text-start w-100 ${activeTab === 'achievements' ? 'active' : ''}`}
                      onClick={() => setActiveTab('achievements')}
                    >
                      <i className="fas fa-trophy me-2"></i>Réalisations
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link text-start w-100 ${activeTab === 'settings' ? 'active' : ''}`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <i className="fas fa-cog me-2"></i>Paramètres
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="col-lg-9">
            {/* Informations personnelles */}
            {activeTab === 'info' && (
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Informations personnelles</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleProfileSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">Prénom</label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                          value={profileForm.firstName}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                          value={profileForm.lastName}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <hr />
                    <h6>Changer le mot de passe</h6>
                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label">Mot de passe actuel</label>
                      <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        name="currentPassword"
                        value={profileForm.currentPassword}
                        onChange={handleProfileChange}
                      />
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="newPassword" className="form-label">Nouveau mot de passe</label>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          name="newPassword"
                          value={profileForm.newPassword}
                          onChange={handleProfileChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={profileForm.confirmPassword}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Enregistrer les modifications</button>
                  </form>
                </div>
              </div>
            )}
            
            {/* Mes cours */}
            {activeTab === 'courses' && (
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Mes cours</h5>
                </div>
                <div className="card-body">
                  <h6>Cours en cours</h6>
                  {userData.enrolledCourses.map(course => (
                    <div key={course.id} className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">{course.title}</h6>
                          <span className="badge bg-primary">{course.progress}% terminé</span>
                        </div>
                        <div className="progress mt-2">
                          <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{ width: `${course.progress}%` }} 
                            aria-valuenow={course.progress} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                        <div className="mt-2">
                          <a href={`/courses/${course.id}`} className="btn btn-sm btn-outline-primary">Continuer</a>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <h6 className="mt-4">Cours terminés</h6>
                  {userData.completedCourses.map(course => (
                    <div key={course.id} className="card mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">{course.title}</h6>
                          <span className="badge bg-success">Terminé le {course.completedDate}</span>
                        </div>
                        <div className="mt-2">
                          <a href={`/courses/${course.id}`} className="btn btn-sm btn-outline-primary">Revoir</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Réalisations */}
            {activeTab === 'achievements' && (
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Réalisations</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    {userData.achievements.map(achievement => (
                      <div key={achievement.id} className="col-md-4 mb-3">
                        <div className="card achievement-card text-center">
                          <div className="card-body">
                            <div className="achievement-icon mb-3">
                              <i className={`fas fa-${achievement.icon} fa-3x text-warning`}></i>
                            </div>
                            <h6 className="card-title">{achievement.title}</h6>
                            <p className="card-text text-muted small">Obtenu le {achievement.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Paramètres */}
            {activeTab === 'settings' && (
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Paramètres</h5>
                </div>
                <div className="card-body">
                  <h6>Préférences de notification</h6>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="emailNotifications" defaultChecked />
                    <label className="form-check-label" htmlFor="emailNotifications">
                      Notifications par email
                    </label>
                  </div>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="courseUpdates" defaultChecked />
                    <label className="form-check-label" htmlFor="courseUpdates">
                      Mises à jour des cours
                    </label>
                  </div>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="newCourses" defaultChecked />
                    <label className="form-check-label" htmlFor="newCourses">
                      Nouveaux cours disponibles
                    </label>
                  </div>
                  
                  <hr />
                  
                  <h6>Confidentialité</h6>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="profileVisibility" defaultChecked />
                    <label className="form-check-label" htmlFor="profileVisibility">
                      Profil visible par les autres utilisateurs
                    </label>
                  </div>
                  <div className="form-check form-switch mb-2">
                    <input className="form-check-input" type="checkbox" id="progressVisibility" defaultChecked />
                    <label className="form-check-label" htmlFor="progressVisibility">
                      Progression visible par les autres utilisateurs
                    </label>
                  </div>
                  
                  <hr />
                  
                  <h6>Actions du compte</h6>
                  <button className="btn btn-outline-danger">Désactiver mon compte</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
