import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/main.css';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Données simulées du cours
  const courseData = {
    mathematics: {
      title: 'Mathematics (Syllabus D)',
      description: 'Cambridge O Level Mathematics encourage les apprenants à développer leur capacité mathématique comme une compétence clé de la vie, et comme une base solide pour des études ultérieures en mathématiques ou pour soutenir des compétences dans d\'autres matières.',
      objectives: [
        'Développer la compétence, la confiance et la fluidité dans l\'utilisation des techniques mathématiques',
        'Développer le sens des quantités, des modèles et des relations',
        'Mettre l\'accent sur la résolution de problèmes en mathématiques et dans des contextes réels',
        'Favoriser la présentation et l\'interprétation appropriées des résultats'
      ],
      modules: [
        { id: 'module1', title: 'Nombres et opérations', progress: 40 },
        { id: 'module2', title: 'Algèbre', progress: 100 },
        { id: 'module3', title: 'Géométrie', progress: 0 },
        { id: 'module4', title: 'Statistiques et probabilités', progress: 0 }
      ],
      resources: [
        { title: 'Syllabus 2023-2025', type: 'pdf' },
        { title: 'Examens passés 2022', type: 'pdf' },
        { title: 'Corrigés des examens', type: 'pdf' }
      ]
    },
    'business-studies': {
      title: 'Business Studies',
      description: 'Le programme Cambridge O Level Business Studies développe la compréhension des apprenants sur l\'activité commerciale dans les secteurs public et privé, et l\'importance de l\'innovation et du changement.',
      objectives: [
        'Comprendre les facteurs influençant la prise de décision commerciale',
        'Étudier les valeurs essentielles de coopération et d\'interdépendance',
        'Développer des compétences connexes telles que la numératie et l\'enquête',
        'Acquérir une base solide pour des études ultérieures'
      ],
      modules: [
        { id: 'module1', title: 'Introduction aux affaires', progress: 75 },
        { id: 'module2', title: 'Organisation et environnement des entreprises', progress: 50 },
        { id: 'module3', title: 'Marketing', progress: 25 },
        { id: 'module4', title: 'Finance et comptabilité', progress: 0 }
      ],
      resources: [
        { title: 'Syllabus 2023-2025', type: 'pdf' },
        { title: 'Examens passés 2022', type: 'pdf' },
        { title: 'Corrigés des examens', type: 'pdf' }
      ]
    },
    'english-language': {
      title: 'English Language',
      description: 'Cambridge O Level English Language est conçu pour les apprenants qui parlent anglais à la maison ou à l\'école, à un niveau proche de la langue maternelle.',
      objectives: [
        'Développer la capacité de communiquer clairement, avec précision et efficacité à l\'écrit',
        'Utiliser un large éventail de vocabulaire, et la grammaire, l\'orthographe et la ponctuation correctes',
        'Développer un style personnel et une conscience du public auquel on s\'adresse',
        'Encourager la lecture large pour le plaisir et la compréhension'
      ],
      modules: [
        { id: 'module1', title: 'Compréhension de lecture', progress: 60 },
        { id: 'module2', title: 'Rédaction narrative et descriptive', progress: 30 },
        { id: 'module3', title: 'Rédaction argumentative et persuasive', progress: 0 },
        { id: 'module4', title: 'Grammaire et vocabulaire', progress: 20 }
      ],
      resources: [
        { title: 'Syllabus 2023-2025', type: 'pdf' },
        { title: 'Examens passés 2022', type: 'pdf' },
        { title: 'Corrigés des examens', type: 'pdf' }
      ]
    },
    'economics': {
      title: 'Economics',
      description: 'Le programme Cambridge O Level Economics fournit une base idéale pour des études ultérieures et pour une future carrière dans l\'économie ou les professions connexes.',
      objectives: [
        'Introduire les apprenants à la terminologie, aux concepts et aux principes économiques',
        'Développer les compétences d\'analyse et d\'interprétation des données économiques',
        'Explorer les outils d\'analyse et d\'évaluation économiques',
        'Comprendre comment les économies sont affectées par des problèmes mondiaux'
      ],
      modules: [
        { id: 'module1', title: 'Concepts économiques de base', progress: 80 },
        { id: 'module2', title: 'Économie des consommateurs et des producteurs', progress: 45 },
        { id: 'module3', title: 'Économie gouvernementale et internationale', progress: 10 },
        { id: 'module4', title: 'Développement économique', progress: 0 }
      ],
      resources: [
        { title: 'Syllabus 2023-2025', type: 'pdf' },
        { title: 'Examens passés 2022', type: 'pdf' },
        { title: 'Corrigés des examens', type: 'pdf' }
      ]
    },
    'art-design': {
      title: 'Art & Design',
      description: 'Cambridge O Level Art & Design encourage une réponse personnelle en stimulant l\'imagination, la sensibilité, la pensée conceptuelle, les pouvoirs d\'observation et la capacité d\'analyse.',
      objectives: [
        'Développer la confiance et l\'enthousiasme en pratiquant des compétences techniques',
        'Identifier et résoudre des problèmes dans les formes visuelles et tactiles',
        'Développer des idées des premières tentatives aux solutions finales',
        'Développer une conscience du rôle joué par les arts visuels dans la société'
      ],
      modules: [
        { id: 'module1', title: 'Observation et enregistrement', progress: 65 },
        { id: 'module2', title: 'Exploration et développement', progress: 40 },
        { id: 'module3', title: 'Organisation et relations', progress: 15 },
        { id: 'module4', title: 'Sélection et contrôle', progress: 0 }
      ],
      resources: [
        { title: 'Syllabus 2023-2025', type: 'pdf' },
        { title: 'Examens passés 2022', type: 'pdf' },
        { title: 'Corrigés des examens', type: 'pdf' }
      ]
    },
    'travel-tourism': {
      title: 'Travel & Tourism',
      description: 'Cambridge O Level Travel and Tourism est conçu pour aider à répondre au besoin d\'individus qualifiés et compétents dans cette industrie en rapide diversification.',
      objectives: [
        'Fournir une compréhension de la nature du voyage et du tourisme',
        'Développer les concepts, modèles et théories utilisés dans l\'industrie',
        'Souligner l\'importance de la durabilité et du marketing',
        'Améliorer les compétences d\'analyse et d\'évaluation'
      ],
      modules: [
        { id: 'module1', title: 'Introduction au tourisme', progress: 70 },
        { id: 'module2', title: 'Destinations touristiques', progress: 35 },
        { id: 'module3', title: 'Marketing touristique', progress: 5 },
        { id: 'module4', title: 'Tourisme durable', progress: 0 }
      ],
      resources: [
        { title: 'Syllabus 2023-2025', type: 'pdf' },
        { title: 'Examens passés 2022', type: 'pdf' },
        { title: 'Corrigés des examens', type: 'pdf' }
      ]
    }
  };

  // Récupérer les données du cours actuel
  const course = courseData[courseId] || {
    title: 'Cours non trouvé',
    description: 'Ce cours n\'existe pas ou a été supprimé.',
    objectives: [],
    modules: [],
    resources: []
  };

  return (
    <div className="course-detail-container">
      <div className="container">
        <div className="course-header">
          <Link to="/courses" className="back-link">
            &lt; Retour au catalogue
          </Link>
          <h1 className="course-title">{course.title}</h1>
        </div>

        {/* Onglets */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Vue d'ensemble
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'modules' ? 'active' : ''}`}
              onClick={() => setActiveTab('modules')}
            >
              Modules
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              Ressources
            </button>
          </li>
        </ul>

        {/* Contenu des onglets */}
        <div className="tab-content">
          {/* Vue d'ensemble */}
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <h3>Description du cours</h3>
              <p>{course.description}</p>
              
              <h3>Objectifs d'apprentissage</h3>
              <ul className="objectives-list">
                {course.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Modules */}
          {activeTab === 'modules' && (
            <div className="modules-tab">
              <h3>Modules du cours</h3>
              {course.modules.map((module) => (
                <div key={module.id} className="module-card mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="module-title">{module.title}</h4>
                      <div className="progress mb-3">
                        <div 
                          className="progress-bar" 
                          role="progressbar" 
                          style={{ width: `${module.progress}%` }} 
                          aria-valuenow={module.progress} 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                        >
                          {module.progress}%
                        </div>
                      </div>
                      <Link 
                        to={`/courses/${courseId}/modules/${module.id}`} 
                        className="btn btn-primary"
                      >
                        {module.progress === 0 ? 'Commencer' : 
                         module.progress === 100 ? 'Revoir' : 'Continuer'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Ressources */}
          {activeTab === 'resources' && (
            <div className="resources-tab">
              <h3>Ressources du cours</h3>
              <div className="resources-list">
                {course.resources.map((resource, index) => (
                  <div key={index} className="resource-item">
                    <div className="card mb-2">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <i className={`fas fa-${resource.type === 'pdf' ? 'file-pdf' : 'file'} me-2`}></i>
                          {resource.title}
                        </div>
                        <a href="#" className="btn btn-sm btn-outline-primary">Télécharger</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
