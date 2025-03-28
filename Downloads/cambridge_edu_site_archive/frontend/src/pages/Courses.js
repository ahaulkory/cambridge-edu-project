import React, { useState } from 'react';
import '../styles/main.css';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sciences: false,
    langues: false,
    commerce: false,
    arts: false
  });

  // Données simulées des cours
  const courses = [
    {
      id: 'mathematics',
      title: 'Mathematics (Syllabus D)',
      description: 'Développez vos compétences mathématiques avec notre programme complet basé sur le syllabus Cambridge O Level.',
      category: 'sciences',
      image: '/assets/images/mathematics.jpg'
    },
    {
      id: 'business-studies',
      title: 'Business Studies',
      description: 'Apprenez les principes fondamentaux du commerce et de la gestion d\'entreprise selon le programme Cambridge O Level.',
      category: 'commerce',
      image: '/assets/images/business.jpg'
    },
    {
      id: 'english-language',
      title: 'English Language',
      description: 'Améliorez vos compétences en anglais pour réussir vos examens Cambridge O Level.',
      category: 'langues',
      image: '/assets/images/english.jpg'
    },
    {
      id: 'economics',
      title: 'Economics',
      description: 'Découvrez les principes économiques et leur application dans le monde réel selon le programme Cambridge O Level.',
      category: 'commerce',
      image: '/assets/images/economics.jpg'
    },
    {
      id: 'art-design',
      title: 'Art & Design',
      description: 'Exprimez votre créativité et développez vos compétences artistiques selon le programme Cambridge O Level.',
      category: 'arts',
      image: '/assets/images/art.jpg'
    },
    {
      id: 'travel-tourism',
      title: 'Travel & Tourism',
      description: 'Explorez l\'industrie du voyage et du tourisme avec notre programme complet basé sur le syllabus Cambridge O Level.',
      category: 'commerce',
      image: '/assets/images/travel.jpg'
    }
  ];

  // Filtrer les cours en fonction de la recherche et des filtres
  const filteredCourses = courses.filter(course => {
    // Filtre de recherche
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre de catégorie
    const noFiltersActive = !Object.values(filters).some(value => value);
    const matchesFilter = noFiltersActive || filters[course.category];
    
    return matchesSearch && matchesFilter;
  });

  // Gérer le changement de filtre
  const handleFilterChange = (category) => {
    setFilters({
      ...filters,
      [category]: !filters[category]
    });
  };

  return (
    <div className="courses-container">
      <div className="container">
        <h1 className="page-title">Catalogue de Cours</h1>
        
        {/* Barre de recherche */}
        <div className="search-bar mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un cours..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Filtres */}
        <div className="filters mb-4">
          <h5>Filtres:</h5>
          <div className="btn-group" role="group">
            <button 
              className={`btn ${filters.sciences ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('sciences')}
            >
              Sciences
            </button>
            <button 
              className={`btn ${filters.langues ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('langues')}
            >
              Langues
            </button>
            <button 
              className={`btn ${filters.commerce ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('commerce')}
            >
              Commerce
            </button>
            <button 
              className={`btn ${filters.arts ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('arts')}
            >
              Arts
            </button>
          </div>
        </div>
        
        {/* Liste des cours */}
        <div className="course-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div key={course.id} className="course-card mb-4">
                <div className="row g-0">
                  <div className="col-md-3">
                    <div className="course-image" style={{ backgroundImage: `url(${course.image})` }}></div>
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h3 className="card-title">{course.title}</h3>
                      <p className="card-text">{course.description}</p>
                      <a href={`/courses/${course.id}`} className="btn btn-primary">Commencer</a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>Aucun cours ne correspond à votre recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
