import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/main.css';

const ModuleDetail = () => {
  const { courseId, moduleId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);

  // Données simulées du module
  const moduleData = {
    mathematics: {
      module1: {
        title: 'Nombres et opérations',
        progress: 40,
        lessons: [
          {
            title: 'Introduction aux nombres réels',
            content: `
              <h3>Introduction aux nombres réels</h3>
              <p>Les nombres réels comprennent tous les nombres rationnels et irrationnels. Ils peuvent être représentés sur une droite numérique continue.</p>
              <p>Les nombres réels incluent :</p>
              <ul>
                <li>Nombres naturels (1, 2, 3, ...)</li>
                <li>Nombres entiers (..., -2, -1, 0, 1, 2, ...)</li>
                <li>Nombres rationnels (fractions comme 1/2, 3/4, etc.)</li>
                <li>Nombres irrationnels (comme π, √2, etc.)</li>
              </ul>
              <div class="example-box">
                <h4>Exemple</h4>
                <p>√2 ≈ 1.414... est un nombre irrationnel car il ne peut pas être exprimé comme une fraction et sa représentation décimale est non périodique et infinie.</p>
              </div>
            `,
            completed: true
          },
          {
            title: 'Opérations arithmétiques',
            content: `
              <h3>Opérations arithmétiques</h3>
              <p>Les opérations arithmétiques de base sont l'addition, la soustraction, la multiplication et la division.</p>
              <h4>Propriétés importantes</h4>
              <ul>
                <li><strong>Commutativité</strong>: a + b = b + a et a × b = b × a</li>
                <li><strong>Associativité</strong>: (a + b) + c = a + (b + c) et (a × b) × c = a × (b × c)</li>
                <li><strong>Distributivité</strong>: a × (b + c) = a × b + a × c</li>
              </ul>
              <div class="example-box">
                <h4>Exemple</h4>
                <p>Calculer (3 + 4) × 5 en utilisant la distributivité :</p>
                <p>(3 + 4) × 5 = 7 × 5 = 35</p>
                <p>Ou : 3 × 5 + 4 × 5 = 15 + 20 = 35</p>
              </div>
            `,
            completed: true
          },
          {
            title: 'Fractions et décimales',
            content: `
              <h3>Fractions et décimales</h3>
              <p>Les fractions représentent une partie d'un tout et peuvent être converties en nombres décimaux.</p>
              <h4>Conversion de fractions en décimales</h4>
              <p>Pour convertir une fraction en décimale, divisez le numérateur par le dénominateur.</p>
              <h4>Types de nombres décimaux</h4>
              <ul>
                <li><strong>Décimales finies</strong>: par exemple, 1/4 = 0.25</li>
                <li><strong>Décimales périodiques</strong>: par exemple, 1/3 = 0.333...</li>
              </ul>
              <div class="example-box">
                <h4>Exemple</h4>
                <p>Convertir 3/8 en décimale :</p>
                <p>3 ÷ 8 = 0.375</p>
              </div>
            `,
            completed: true
          },
          {
            title: 'Pourcentages et ratios',
            content: `
              <h3>Pourcentages et ratios</h3>
              <p>Les pourcentages sont des fractions avec un dénominateur de 100, tandis que les ratios comparent des quantités.</p>
              <h4>Calcul de pourcentages</h4>
              <p>Pour calculer x% de y : (x/100) × y</p>
              <h4>Ratios</h4>
              <p>Un ratio a:b compare la quantité a à la quantité b.</p>
              <div class="example-box">
                <h4>Exemple</h4>
                <p>Calculer 15% de 80 :</p>
                <p>(15/100) × 80 = 0.15 × 80 = 12</p>
                <p>Si le ratio de garçons à filles dans une classe est 3:5 et qu'il y a 24 élèves au total, combien y a-t-il de garçons ?</p>
                <p>Ratio total : 3 + 5 = 8 parts</p>
                <p>Nombre de garçons : (3/8) × 24 = 9</p>
              </div>
            `,
            completed: false
          },
          {
            title: 'Puissances et racines',
            content: `
              <h3>Puissances et racines</h3>
              <p>Les puissances représentent la multiplication répétée d'un nombre par lui-même, tandis que les racines sont l'opération inverse.</p>
              <h4>Lois des exposants</h4>
              <ul>
                <li>a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup></li>
                <li>a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m-n</sup></li>
                <li>(a<sup>m</sup>)<sup>n</sup> = a<sup>m×n</sup></li>
              </ul>
              <h4>Racines</h4>
              <p>La racine n-ième de a est le nombre qui, élevé à la puissance n, donne a.</p>
              <div class="example-box">
                <h4>Exemple</h4>
                <p>Simplifier 2<sup>3</sup> × 2<sup>4</sup> :</p>
                <p>2<sup>3</sup> × 2<sup>4</sup> = 2<sup>3+4</sup> = 2<sup>7</sup> = 128</p>
                <p>Calculer √25 :</p>
                <p>√25 = 5 (car 5<sup>2</sup> = 25)</p>
              </div>
            `,
            completed: false
          }
        ],
        exercises: [
          {
            question: "Convertissez la fraction 5/8 en décimale.",
            options: ["0.625", "0.675", "0.825", "0.875"],
            correctAnswer: 0
          },
          {
            question: "Calculez 35% de 120.",
            options: ["36", "42", "48", "52"],
            correctAnswer: 1
          },
          {
            question: "Si le ratio de pommes à oranges est 3:5 et qu'il y a 24 fruits au total, combien y a-t-il de pommes ?",
            options: ["6", "9", "15", "18"],
            correctAnswer: 1
          }
        ]
      }
    }
  };

  // Récupérer les données du module actuel
  const moduleInfo = moduleData[courseId]?.[moduleId] || {
    title: 'Module non trouvé',
    progress: 0,
    lessons: [],
    exercises: []
  };

  // Navigation entre les leçons
  const goToPreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const goToNextLesson = () => {
    if (currentLesson < moduleInfo.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  // Leçon actuelle
  const lesson = moduleInfo.lessons[currentLesson] || {
    title: 'Leçon non trouvée',
    content: '<p>Cette leçon n\'existe pas ou a été supprimée.</p>',
    completed: false
  };

  return (
    <div className="module-detail-container">
      <div className="container">
        <div className="module-header">
          <Link to={`/courses/${courseId}`} className="back-link">
            &lt; Retour au cours
          </Link>
          <h1 className="module-title">{moduleInfo.title}</h1>
          <div className="progress mb-4">
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{ width: `${moduleInfo.progress}%` }} 
              aria-valuenow={moduleInfo.progress} 
              aria-valuemin="0" 
              aria-valuemax="100"
            >
              {moduleInfo.progress}%
            </div>
          </div>
        </div>

        <div className="row">
          {/* Sidebar avec la liste des leçons */}
          <div className="col-md-3">
            <div className="lessons-sidebar">
              <h3>Contenu du module</h3>
              <ul className="lessons-list">
                {moduleInfo.lessons.map((lessonItem, index) => (
                  <li 
                    key={index} 
                    className={`lesson-item ${index === currentLesson ? 'active' : ''} ${lessonItem.completed ? 'completed' : ''}`}
                    onClick={() => setCurrentLesson(index)}
                  >
                    {lessonItem.completed && <i className="fas fa-check-circle me-2"></i>}
                    {lessonItem.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contenu principal de la leçon */}
          <div className="col-md-9">
            <div className="lesson-content">
              <div dangerouslySetInnerHTML={{ __html: lesson.content }}></div>

              {/* Exercices (affichés uniquement si disponibles pour cette leçon) */}
              {currentLesson === 3 && moduleInfo.exercises.length > 0 && (
                <div className="exercises-section mt-5">
                  <h3>Exercices pratiques</h3>
                  {moduleInfo.exercises.map((exercise, index) => (
                    <div key={index} className="exercise-item card mb-3">
                      <div className="card-body">
                        <h4 className="exercise-question">{exercise.question}</h4>
                        <div className="options-list">
                          {exercise.options.map((option, optIndex) => (
                            <div key={optIndex} className="form-check">
                              <input 
                                className="form-check-input" 
                                type="radio" 
                                name={`exercise-${index}`} 
                                id={`option-${index}-${optIndex}`} 
                              />
                              <label className="form-check-label" htmlFor={`option-${index}-${optIndex}`}>
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                        <button className="btn btn-outline-primary mt-2">Vérifier</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation entre les leçons */}
              <div className="lesson-navigation mt-4 d-flex justify-content-between">
                <button 
                  className="btn btn-outline-primary" 
                  onClick={goToPreviousLesson}
                  disabled={currentLesson === 0}
                >
                  &lt; Précédent
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={goToNextLesson}
                  disabled={currentLesson === moduleInfo.lessons.length - 1}
                >
                  Suivant &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
