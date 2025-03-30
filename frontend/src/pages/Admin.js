import React, { useState } from 'react';
import '../styles/main.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Données simulées pour le tableau de bord
  const dashboardData = {
    totalCourses: 6,
    totalModules: 24,
    totalUsers: 120,
    recentUsers: [
      { id: 1, name: 'Sophie Martin', email: 'sophie.martin@example.com', date: '27/03/2025' },
      { id: 2, name: 'Thomas Dubois', email: 'thomas.dubois@example.com', date: '26/03/2025' },
      { id: 3, name: 'Emma Petit', email: 'emma.petit@example.com', date: '25/03/2025' }
    ],
    courseUsage: [
      { id: 'mathematics', title: 'Mathematics', users: 45 },
      { id: 'business-studies', title: 'Business Studies', users: 32 },
      { id: 'english-language', title: 'English Language', users: 28 },
      { id: 'economics', title: 'Economics', users: 15 }
    ]
  };
  
  // Données simulées pour la gestion des cours
  const courses = [
    { id: 'mathematics', title: 'Mathematics (Syllabus D)', modules: 4 },
    { id: 'business-studies', title: 'Business Studies', modules: 4 },
    { id: 'english-language', title: 'English Language', modules: 4 },
    { id: 'economics', title: 'Economics', modules: 4 },
    { id: 'art-design', title: 'Art & Design', modules: 4 },
    { id: 'travel-tourism', title: 'Travel & Tourism', modules: 4 }
  ];
  
  // État pour le formulaire d'ajout de cours
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: ''
  });
  
  // Gestion du formulaire d'ajout de cours
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value
    });
  };
  
  const handleCourseSubmit = (e) => {
    e.preventDefault();
    console.log('Nouveau cours à ajouter:', newCourse);
    // Dans une implémentation réelle, nous enverrions ces données au backend
    // et mettrions à jour la liste des cours
    
    // Réinitialiser le formulaire
    setNewCourse({
      title: '',
      description: '',
      category: ''
    });
  };
  
  // État pour le téléchargement de fichier
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  const handleFileUpload = (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log('Fichier à télécharger:', selectedFile);
      // Dans une implémentation réelle, nous enverrions ce fichier au backend
    } else {
      alert('Veuillez sélectionner un fichier');
    }
  };

  return (
    <div className="admin-container">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link text-start w-100 ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <i className="fas fa-tachometer-alt me-2"></i>
                    Tableau de bord
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link text-start w-100 ${activeTab === 'courses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('courses')}
                  >
                    <i className="fas fa-book me-2"></i>
                    Gestion des cours
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link text-start w-100 ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                  >
                    <i className="fas fa-users me-2"></i>
                    Utilisateurs
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link text-start w-100 ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}
                  >
                    <i className="fas fa-upload me-2"></i>
                    Téléchargement
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link btn btn-link text-start w-100 ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <i className="fas fa-cog me-2"></i>
                    Paramètres
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contenu principal */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Administration</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary">Exporter</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Imprimer</button>
                </div>
              </div>
            </div>

            {/* Tableau de bord */}
            {activeTab === 'dashboard' && (
              <div className="dashboard-tab">
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="card text-white bg-primary">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title">Matières</h5>
                            <h2 className="display-4">{dashboardData.totalCourses}</h2>
                          </div>
                          <i className="fas fa-book fa-3x"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card text-white bg-success">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title">Modules</h5>
                            <h2 className="display-4">{dashboardData.totalModules}</h2>
                          </div>
                          <i className="fas fa-layer-group fa-3x"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="card text-white bg-info">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h5 className="card-title">Utilisateurs</h5>
                            <h2 className="display-4">{dashboardData.totalUsers}</h2>
                          </div>
                          <i className="fas fa-users fa-3x"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="card">
                      <div className="card-header">
                        Utilisateurs récents
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-striped table-sm">
                            <thead>
                              <tr>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Date d'inscription</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dashboardData.recentUsers.map(user => (
                                <tr key={user.id}>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>{user.date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="card">
                      <div className="card-header">
                        Utilisation des cours
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-striped table-sm">
                            <thead>
                              <tr>
                                <th>Cours</th>
                                <th>Utilisateurs</th>
                              </tr>
                            </thead>
                            <tbody>
                              {dashboardData.courseUsage.map(course => (
                                <tr key={course.id}>
                                  <td>{course.title}</td>
                                  <td>{course.users}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Gestion des cours */}
            {activeTab === 'courses' && (
              <div className="courses-tab">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3>Gestion des cours</h3>
                  <button 
                    className="btn btn-primary" 
                    data-bs-toggle="modal" 
                    data-bs-target="#addCourseModal"
                  >
                    <i className="fas fa-plus me-2"></i>Ajouter un cours
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Titre</th>
                        <th>Modules</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map(course => (
                        <tr key={course.id}>
                          <td>{course.title}</td>
                          <td>{course.modules}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Modal pour ajouter un cours */}
                <div className="modal fade" id="addCourseModal" tabIndex="-1" aria-labelledby="addCourseModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="addCourseModalLabel">Ajouter un nouveau cours</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleCourseSubmit}>
                          <div className="mb-3">
                            <label htmlFor="title" className="form-label">Titre</label>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              name="title"
                              value={newCourse.title}
                              onChange={handleCourseChange}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                              className="form-control"
                              id="description"
                              name="description"
                              rows="3"
                              value={newCourse.description}
                              onChange={handleCourseChange}
                              required
                            ></textarea>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="category" className="form-label">Catégorie</label>
                            <select
                              className="form-select"
                              id="category"
                              name="category"
                              value={newCourse.category}
                              onChange={handleCourseChange}
                              required
                            >
                              <option value="">Sélectionner une catégorie</option>
                              <option value="sciences">Sciences</option>
                              <option value="langues">Langues</option>
                              <option value="commerce">Commerce</option>
                              <option value="arts">Arts</option>
                            </select>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                            <button type="submit" className="btn btn-primary">Ajouter</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Téléchargement de contenu */}
            {activeTab === 'upload' && (
              <div className="upload-tab">
                <h3 className="mb-4">Téléchargement de contenu</h3>
                
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Télécharger un fichier</h5>
                    <form onSubmit={handleFileUpload}>
                      <div className="mb-3">
                        <label htmlFor="fileUpload" className="form-label">Sélectionner un fichier</label>
                        <input
                          type="file"
                          className="form-control"
                          id="fileUpload"
                          onChange={handleFileChange}
                          required
                        />
                        <div className="form-text">Formats acceptés: PDF, DOCX, XLSX, JPG, PNG</div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="fileType" className="form-label">Type de fichier</label>
                        <select className="form-select" id="fileType">
                          <option value="syllabus">Syllabus</option>
                          <option value="exam">Examen passé</option>
                          <option value="solution">Corrigé</option>
                          <option value="resource">Ressource supplémentaire</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="relatedCourse" className="form-label">Cours associé</label>
                        <select className="form-select" id="relatedCourse">
                          <option value="">Sélectionner un cours</option>
                          {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                          ))}
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        <i className="fas fa-upload me-2"></i>Télécharger
                      </button>
                    </form>
                  </div>
                </div>
                
                <div className="card mt-4">
                  <div className="card-header">
                    Fichiers récemment téléchargés
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Nom du fichier</th>
                            <th>Type</th>
                            <th>Cours</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>syllabus_mathematics_2023.pdf</td>
                            <td>Syllabus</td>
                            <td>Mathematics</td>
                            <td>27/03/2025</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-2">
                                <i className="fas fa-download"></i>
                              </button>
                              <button className="btn btn-sm btn-outline-danger">
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>past_exam_english_2022.pdf</td>
                            <td>Examen passé</td>
                            <td>English Language</td>
                            <td>26/03/2025</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-2">
                                <i className="fas fa-download"></i>
                              </button>
                              <button className="btn btn-sm btn-outline-danger">
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
