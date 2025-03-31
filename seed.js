const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Resource = require('./models/Resource');
require('dotenv').config();

// Fonction pour démarrer le serveur MongoDB en mémoire
const startMongoServer = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`Connexion à MongoDB en mémoire établie: ${mongoUri}`);
    return mongoServer;
  } catch (err) {
    console.error('Erreur lors du démarrage du serveur MongoDB en mémoire:', err.message);
    process.exit(1);
  }
};

// Données initiales pour les cours
const courses = [
  {
    title: 'Mathematics (Syllabus D)',
    slug: 'mathematics-syllabus-d',
    description: 'Ce cours couvre tous les aspects du programme de mathématiques du Cambridge O Level, y compris l\'algèbre, la géométrie, les statistiques et les probabilités.',
    category: 'sciences',
    objectives: [
      'Développer des compétences mathématiques dans un contexte qui sera rencontré dans la vie quotidienne',
      'Développer la capacité à résoudre des problèmes, à présenter des solutions logiquement et à interpréter les résultats',
      'Reconnaître les applications des mathématiques dans le monde réel'
    ],
    image: '/assets/images/mathematics.jpg',
    enrolledStudents: 0
  },
  {
    title: 'Business Studies',
    slug: 'business-studies',
    description: 'Ce cours présente aux étudiants les principes fondamentaux des affaires et les aide à comprendre le monde des entreprises.',
    category: 'commerce',
    objectives: [
      'Comprendre les différentes formes d\'organisations commerciales et leurs objectifs',
      'Développer une compréhension des concepts, théories et terminologies utilisés dans les affaires',
      'Appliquer les connaissances et les compétences à des situations commerciales réelles'
    ],
    image: '/assets/images/business.jpg',
    enrolledStudents: 0
  },
  {
    title: 'Economics',
    slug: 'economics',
    description: 'Ce cours aide les étudiants à comprendre les principes économiques fondamentaux et leur application dans le monde réel.',
    category: 'commerce',
    objectives: [
      'Développer une compréhension des concepts économiques et de leur application',
      'Améliorer la capacité à utiliser des outils d\'analyse économique',
      'Comprendre les problèmes économiques actuels et les politiques économiques'
    ],
    image: '/assets/images/economics.jpg',
    enrolledStudents: 0
  },
  {
    title: 'English Language',
    slug: 'english-language',
    description: 'Ce cours développe la capacité des étudiants à communiquer clairement, précisément et efficacement en anglais.',
    category: 'langues',
    objectives: [
      'Développer la capacité à communiquer clairement, précisément et efficacement',
      'Utiliser un large éventail de vocabulaire et une grammaire correcte',
      'Développer un style personnel et une prise de conscience du public visé'
    ],
    image: '/assets/images/english.jpg',
    enrolledStudents: 0
  },
  {
    title: 'Art & Design',
    slug: 'art-design',
    description: 'Ce cours encourage les étudiants à explorer et à développer leur créativité à travers différentes formes d\'art et de design.',
    category: 'arts',
    objectives: [
      'Développer la capacité à observer, sélectionner et interpréter avec imagination',
      'Explorer et développer des idées en utilisant des médias, des processus et des techniques appropriés',
      'Développer une conscience critique des contextes culturels et historiques'
    ],
    image: '/assets/images/art.jpg',
    enrolledStudents: 0
  },
  {
    title: 'Travel & Tourism',
    slug: 'travel-tourism',
    description: 'Ce cours présente aux étudiants l\'industrie du voyage et du tourisme et les aide à comprendre son importance dans l\'économie mondiale.',
    category: 'commerce',
    objectives: [
      'Comprendre les concepts, théories et terminologies utilisés dans l\'industrie du voyage et du tourisme',
      'Développer des compétences pratiques pertinentes pour l\'industrie',
      'Comprendre l\'impact du tourisme sur les économies, les environnements et les sociétés'
    ],
    image: '/assets/images/travel.jpg',
    enrolledStudents: 0
  }
];

// Données initiales pour les modules (exemple pour Mathematics)
const mathModules = [
  {
    title: 'Algèbre',
    description: 'Introduction aux concepts fondamentaux de l\'algèbre',
    order: 1,
    lessons: [
      {
        title: 'Expressions algébriques',
        content: `
# Expressions algébriques

Une expression algébrique est une combinaison de nombres, de variables et d'opérations mathématiques. Les expressions algébriques sont utilisées pour représenter des valeurs qui peuvent changer.

## Exemples d'expressions algébriques

- $2x + 3$
- $a^2 - b^2$
- $\\frac{x}{y} + 5$

## Simplification d'expressions algébriques

Pour simplifier une expression algébrique, nous combinons les termes semblables.

### Exemple

Simplifions l'expression $3x + 2y - x + 5y$

1. Regroupons les termes en $x$ : $3x - x = 2x$
2. Regroupons les termes en $y$ : $2y + 5y = 7y$
3. L'expression simplifiée est donc $2x + 7y$

## Exercices

1. Simplifiez l'expression $4a + 3b - 2a + b$
2. Simplifiez l'expression $5x^2 + 3x - 2x^2 + 4x$
3. Simplifiez l'expression $\\frac{2}{3}m - \\frac{1}{4}n + \\frac{1}{6}m + \\frac{3}{4}n$
        `,
        order: 1
      },
      {
        title: 'Équations linéaires',
        content: `
# Équations linéaires

Une équation linéaire est une équation où la variable a un exposant de 1. La forme générale d'une équation linéaire à une variable est $ax + b = 0$, où $a$ et $b$ sont des constantes et $a \\neq 0$.

## Résolution d'équations linéaires

Pour résoudre une équation linéaire, nous isolons la variable d'un côté de l'équation.

### Exemple

Résolvons l'équation $3x + 4 = 10$

1. Soustrayons 4 des deux côtés : $3x + 4 - 4 = 10 - 4$
2. Simplifions : $3x = 6$
3. Divisons les deux côtés par 3 : $\\frac{3x}{3} = \\frac{6}{3}$
4. Simplifions : $x = 2$

## Équations avec fractions

Pour résoudre une équation avec des fractions, nous multiplions tous les termes par le plus petit commun multiple (PPCM) des dénominateurs.

### Exemple

Résolvons l'équation $\\frac{x}{3} + \\frac{x}{4} = 5$

1. Le PPCM de 3 et 4 est 12
2. Multiplions tous les termes par 12 : $12 \\cdot \\frac{x}{3} + 12 \\cdot \\frac{x}{4} = 12 \\cdot 5$
3. Simplifions : $4x + 3x = 60$
4. Combinons les termes en $x$ : $7x = 60$
5. Divisons par 7 : $x = \\frac{60}{7} = 8\\frac{4}{7}$

## Exercices

1. Résolvez l'équation $5x - 3 = 12$
2. Résolvez l'équation $2(x + 3) = 4(x - 1)$
3. Résolvez l'équation $\\frac{x}{2} - \\frac{x}{5} = 3$
        `,
        order: 2
      },
      {
        title: 'Factorisation',
        content: `
# Factorisation

La factorisation est le processus qui consiste à exprimer une expression algébrique comme produit de facteurs.

## Méthodes de factorisation

### 1. Mise en évidence du facteur commun

Si tous les termes d'une expression ont un facteur commun, nous pouvons le mettre en évidence.

#### Exemple

Factorisons l'expression $3x + 3y$

1. Le facteur commun est 3
2. $3x + 3y = 3(x + y)$

### 2. Factorisation des expressions quadratiques

Pour factoriser une expression quadratique de la forme $ax^2 + bx + c$, nous cherchons deux nombres dont le produit est $ac$ et la somme est $b$.

#### Exemple

Factorisons l'expression $x^2 + 5x + 6$

1. Nous cherchons deux nombres dont le produit est $1 \\cdot 6 = 6$ et la somme est 5
2. Ces nombres sont 2 et 3
3. Réécrivons le terme du milieu : $x^2 + 2x + 3x + 6$
4. Regroupons les termes : $(x^2 + 2x) + (3x + 6)$
5. Mettons en évidence les facteurs communs : $x(x + 2) + 3(x + 2)$
6. Mettons en évidence le facteur commun $(x + 2)$ : $(x + 2)(x + 3)$

## Exercices

1. Factorisez l'expression $4x + 4y + 4z$
2. Factorisez l'expression $x^2 + 7x + 12$
3. Factorisez l'expression $x^2 - 9$
        `,
        order: 3
      },
      {
        title: 'Fonctions et graphiques',
        content: `
# Fonctions et graphiques

Une fonction est une relation qui associe à chaque élément d'un ensemble (appelé domaine) exactement un élément d'un autre ensemble (appelé codomaine).

## Représentation graphique des fonctions

Le graphique d'une fonction est l'ensemble de tous les points $(x, y)$ tels que $y = f(x)$.

### Exemple

Traçons le graphique de la fonction $f(x) = 2x + 1$

1. Créons une table de valeurs :

   | $x$ | $f(x) = 2x + 1$ |
   |-----|-----------------|
   | -2  | $2(-2) + 1 = -3$ |
   | -1  | $2(-1) + 1 = -1$ |
   | 0   | $2(0) + 1 = 1$   |
   | 1   | $2(1) + 1 = 3$   |
   | 2   | $2(2) + 1 = 5$   |

2. Traçons ces points sur un plan cartésien et relions-les par une ligne droite.

## Fonctions quadratiques

Une fonction quadratique est une fonction de la forme $f(x) = ax^2 + bx + c$, où $a \\neq 0$. Le graphique d'une fonction quadratique est une parabole.

### Exemple

Traçons le graphique de la fonction $f(x) = x^2 - 4$

1. Créons une table de valeurs :

   | $x$ | $f(x) = x^2 - 4$ |
   |-----|-----------------|
   | -3  | $(-3)^2 - 4 = 5$ |
   | -2  | $(-2)^2 - 4 = 0$ |
   | -1  | $(-1)^2 - 4 = -3$ |
   | 0   | $(0)^2 - 4 = -4$  |
   | 1   | $(1)^2 - 4 = -3$  |
   | 2   | $(2)^2 - 4 = 0$   |
   | 3   | $(3)^2 - 4 = 5$   |

2. Traçons ces points sur un plan cartésien et relions-les par une courbe lisse.

## Exercices

1. Tracez le graphique de la fonction $f(x) = 3x - 2$
2. Tracez le graphique de la fonction $f(x) = x^2 + 2x + 1$
3. Trouvez les points d'intersection de la fonction $f(x) = 2x - 1$ avec les axes des coordonnées.
        `,
        order: 4
      }
    ],
    exercises: [
      {
        question: 'Simplifiez l\'expression 3x + 2y - x + 5y',
        options: [
          '2x + 7y',
          '4x + 7y',
          '2x + 3y',
          '3x + 7y'
        ],
        correctAnswer: 0,
        explanation: 'Pour simplifier cette expression, nous regroupons les termes semblables. Pour les termes en x : 3x - x = 2x. Pour les termes en y : 2y + 5y = 7y. Donc, l\'expression simplifiée est 2x + 7y.'
      },
      {
        question: 'Résolvez l\'équation 2x + 5 = 11',
        options: [
          'x = 3',
          'x = 4',
          'x = 5',
          'x = 6'
        ],
        correctAnswer: 0,
        explanation: 'Pour résoudre cette équation, nous isolons x. 2x + 5 = 11 => 2x = 11 - 5 => 2x = 6 => x = 3.'
      },
      {
        question: 'Factorisez l\'expression x² + 6x + 8',
        options: [
          '(x + 2)(x + 4)',
          '(x + 4)(x + 2)',
          '(x - 2)(x - 4)',
          '(x - 4)(x - 2)'
        ],
        correctAnswer: 0,
        explanation: 'Pour factoriser cette expression quadratique, nous cherchons deux nombres dont le produit est 8 et la somme est 6. Ces nombres sont 2 et 4. Donc, x² + 6x + 8 = (x + 2)(x + 4).'
      }
    ]
  },
  {
    title: 'Géométrie',
    description: 'Étude des propriétés et des relations des figures dans l\'espace',
    order: 2,
    lessons: [
      {
        title: 'Angles et triangles',
        content: `
# Angles et triangles

## Types d'angles

- **Angle aigu** : mesure inférieure à 90°
- **Angle droit** : mesure exactement 90°
- **Angle obtus** : mesure supérieure à 90° mais inférieure à 180°
- **Angle plat** : mesure exactement 180°
- **Angle rentrant** : mesure supérieure à 180° mais inférieure à 360°

## Triangles

Un triangle est une figure géométrique à trois côtés et trois angles.

### Types de triangles selon les côtés

- **Triangle équilatéral** : trois côtés égaux
- **Triangle isocèle** : deux côtés égaux
- **Triangle scalène** : trois côtés de longueurs différentes

### Types de triangles selon les angles

- **Triangle acutangle** : trois angles aigus
- **Triangle rectangle** : un angle droit
- **Triangle obtusangle** : un angle obtus

## Propriétés des triangles

1. La somme des angles d'un triangle est toujours égale à 180°.
2. Dans un triangle isocèle, les angles opposés aux côtés égaux sont égaux.
3. Dans un triangle équilatéral, tous les angles sont égaux à 60°.
4. Dans un triangle rectangle, les deux angles aigus sont complémentaires (leur somme est égale à 90°).

## Théorème de Pythagore

Dans un triangle rectangle, le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés.

Si $a$ et $b$ sont les longueurs des cathètes et $c$ est la longueur de l'hypoténuse, alors :

$c^2 = a^2 + b^2$

### Exemple

Dans un triangle rectangle, si les cathètes mesurent 3 cm et 4 cm, quelle est la longueur de l'hypoténuse ?

$c^2 = 3^2 + 4^2 = 9 + 16 = 25$
$c = \\sqrt{25} = 5$ cm

## Exercices

1. Dans un triangle, deux angles mesurent 45° et 60°. Quelle est la mesure du troisième angle ?
2. Un triangle a des côtés de longueurs 5 cm, 12 cm et 13 cm. Est-ce un triangle rectangle ?
3. Dans un triangle isocèle, un angle mesure 100°. Si cet angle est opposé à un côté égal, quelles sont les mesures des deux autres angles ?
        `,
        order: 1
      },
      {
        title: 'Cercles',
        content: `
# Cercles

Un cercle est l'ensemble de tous les points d'un plan situés à une distance constante d'un point fixe appelé centre. Cette distance constante est appelée rayon.

## Éléments d'un cercle

- **Centre** : point fixe à partir duquel tous les points du cercle sont équidistants
- **Rayon** : distance constante du centre à n'importe quel point du cercle
- **Diamètre** : segment de droite passant par le centre et reliant deux points du cercle (égal à deux fois le rayon)
- **Corde** : segment de droite reliant deux points du cercle
- **Arc** : portion du cercle comprise entre deux points
- **Secteur** : région du cercle délimitée par deux rayons et l'arc qu'ils interceptent
- **Segment** : région du cercle délimitée par une corde et l'arc qu'elle sous-tend

## Propriétés des cercles

1. Tous les rayons d'un cercle sont égaux.
2. Le diamètre est égal à deux fois le rayon : $d = 2r$
3. La circonférence (périmètre) d'un cercle est donnée par la formule : $C = 2\\pi r$ ou $C = \\pi d$
4. L'aire d'un cercle est donnée par la formule : $A = \\pi r^2$

## Angles dans un cercle

- **Angle au centre** : angle formé par deux rayons
- **Angle inscrit** : angle formé par deux cordes qui se coupent sur le cercle

### Propriétés des angles dans un cercle

1. Un angle inscrit est égal à la moitié de l'angle au centre qui intercepte le même arc.
2. Les angles inscrits qui interceptent le même arc sont égaux.
3. Un angle inscrit dans un demi-cercle est un angle droit.

## Tangente à un cercle

Une tangente à un cercle est une droite qui touche le cercle en exactement un point, appelé point de tangence.

### Propriétés des tangentes

1. Une tangente à un cercle est perpendiculaire au rayon passant par le point de tangence.
2. Les tangentes à un cercle issues d'un même point extérieur sont égales en longueur.

## Exercices

1. Un cercle a un rayon de 5 cm. Calculez sa circonférence et son aire.
2. Un angle au centre d'un cercle mesure 120°. Quelle est la mesure de l'angle inscrit qui intercepte le même arc ?
3. Une corde d'un cercle de rayon 10 cm est située à une distance de 6 cm du centre. Quelle est la longueur de cette corde ?
        `,
        order: 2
      },
      {
        title: 'Similitude et congruence',
        content: `
# Similitude et congruence

## Congruence

Deux figures géométriques sont congruentes si elles ont exactement la même forme et la même taille. En d'autres termes, une figure peut être transformée en l'autre par une combinaison de translations, de rotations et de réflexions.

### Congruence des triangles

Deux triangles sont congruents si leurs côtés et leurs angles correspondants sont égaux. Il existe plusieurs critères pour déterminer si deux triangles sont congruents :

1. **Critère CCC (Côté-Côté-Côté)** : Si les trois côtés d'un triangle sont égaux aux trois côtés d'un autre triangle, alors les triangles sont congruents.
2. **Critère CAC (Côté-Angle-Côté)** : Si deux côtés et l'angle compris entre ces côtés d'un triangle sont égaux aux éléments correspondants d'un autre triangle, alors les triangles sont congruents.
3. **Critère ACA (Angle-Côté-Angle)** : Si deux angles et le côté compris entre ces angles d'un triangle sont égaux aux éléments correspondants d'un autre triangle, alors les triangles sont congruents.
4. **Critère CCA (Côté-Côté-Angle)** : Si deux côtés et l'angle opposé au plus grand de ces côtés d'un triangle sont égaux aux éléments correspondants d'un autre triangle, alors les triangles sont congruents.

## Similitude

Deux figures géométriques sont semblables si elles ont la même forme mais pas nécessairement la même taille. En d'autres termes, une figure peut être transformée en l'autre par une combinaison de translations, de rotations, de réflexions et de dilatations (changements d'échelle).

### Similitude des triangles

Deux triangles sont semblables si leurs angles correspondants sont égaux et leurs côtés correspondants sont proportionnels. Il existe plusieurs critères pour déterminer si deux triangles sont semblables :

1. **Critère AAA (Angle-Angle-Angle)** : Si les trois angles d'un triangle sont égaux aux trois angles d'un autre triangle, alors les triangles sont semblables.
2. **Critère AA (Angle-Angle)** : Si deux angles d'un triangle sont égaux aux deux angles d'un autre triangle, alors les triangles sont semblables (car la somme des angles d'un triangle est toujours 180°).
3. **Critère CCC (Côté-Côté-Côté)** : Si les trois côtés d'un triangle sont proportionnels aux trois côtés d'un autre triangle, alors les triangles sont semblables.
4. **Critère CAC (Côté-Angle-Côté)** : Si deux côtés d'un triangle sont proportionnels aux deux côtés d'un autre triangle et que les angles compris entre ces côtés sont égaux, alors les triangles sont semblables.

### Rapport de similitude

Le rapport de similitude entre deux figures semblables est le rapport entre les longueurs correspondantes. Si deux triangles sont semblables avec un rapport de similitude $k$, alors :

1. Le rapport des périmètres est égal à $k$.
2. Le rapport des aires est égal à $k^2$.
3. Le rapport des volumes (pour des solides semblables) est égal à $k^3$.

## Exercices

1. Deux triangles ont des côtés de longueurs 3 cm, 4 cm et 5 cm pour le premier, et 6 cm, 8 cm et 10 cm pour le second. Ces triangles sont-ils semblables ? Si oui, quel est le rapport de similitude ?
2. Dans un triangle rectangle, la hauteur issue de l'angle droit divise l'hypoténuse en deux segments. Montrez que les deux triangles ainsi formés sont semblables au triangle original.
3. Deux triangles semblables ont un rapport de similitude de 2. Si l'aire du petit triangle est de 12 cm², quelle est l'aire du grand triangle ?
        `,
        order: 3
      },
      {
        title: 'Transformations géométriques',
        content: `
# Transformations géométriques

Une transformation géométrique est une opération qui modifie la position, la taille ou la forme d'une figure géométrique.

## Types de transformations

### 1. Translation

Une translation déplace chaque point d'une figure de la même distance dans la même direction. Une translation peut être définie par un vecteur qui indique la direction et la distance du déplacement.

#### Propriétés de la translation

- Conserve la forme et la taille de la figure (isométrie)
- Conserve l'orientation de la figure
- Conserve les distances entre les points
- Conserve les angles

### 2. Rotation

Une rotation tourne une figure autour d'un point fixe appelé centre de rotation, selon un angle donné.

#### Propriétés de la rotation

- Conserve la forme et la taille de la figure (isométrie)
- Conserve l'orientation de la figure
- Conserve les distances entre les points
- Conserve les angles

### 3. Réflexion (symétrie axiale)

Une réflexion transforme une figure en son image miroir par rapport à une droite appelée axe de symétrie.

#### Propriétés de la réflexion

- Conserve la forme et la taille de la figure (isométrie)
- Inverse l'orientation de la figure
- Conserve les distances entre les points
- Conserve les angles

### 4. Homothétie (dilatation)

Une homothétie agrandit ou réduit une figure par rapport à un point fixe appelé centre d'homothétie, selon un facteur d'échelle donné.

#### Propriétés de l'homothétie

- Conserve la forme de la figure mais pas sa taille
- Conserve l'orientation de la figure
- Multiplie toutes les distances par le facteur d'échelle
- Conserve les angles

## Composition de transformations

Plusieurs transformations peuvent être appliquées successivement à une figure. Le résultat final dépend de l'ordre dans lequel les transformations sont appliquées.

### Exemples

- Une réflexion suivie d'une autre réflexion par rapport à des axes parallèles équivaut à une translation.
- Une réflexion suivie d'une autre réflexion par rapport à des axes sécants équivaut à une rotation autour du point d'intersection des axes, avec un angle égal à deux fois l'angle entre les axes.
- Deux rotations successives de même centre équivalent à une seule rotation de même centre, avec un angle égal à la somme des angles des rotations individuelles.

## Exercices

1. Un triangle a pour sommets A(1, 1), B(3, 1) et C(2, 3). Déterminez les coordonnées des sommets du triangle après une translation de vecteur (2, -1).
2. Un segment de droite a pour extrémités P(2, 3) et Q(5, 7). Déterminez les coordonnées des extrémités du segment après une rotation de 90° dans le sens horaire autour de l'origine.
3. Un rectangle a pour sommets A(1, 1), B(4, 1), C(4, 3) et D(1, 3). Déterminez les coordonnées des sommets du rectangle après une homothétie de centre O(0, 0) et de rapport 2.
        `,
        order: 4
      }
    ],
    exercises: [
      {
        question: 'Dans un triangle, deux angles mesurent 45° et 60°. Quelle est la mesure du troisième angle ?',
        options: [
          '75°',
          '65°',
          '85°',
          '90°'
        ],
        correctAnswer: 0,
        explanation: 'La somme des angles dans un triangle est de 180°. Si deux angles mesurent 45° et 60°, alors le troisième angle mesure 180° - 45° - 60° = 75°.'
      },
      {
        question: 'Un cercle a un rayon de 7 cm. Quelle est son aire (arrondie au dixième près) ?',
        options: [
          '153,9 cm²',
          '43,9 cm²',
          '21,9 cm²',
          '138,9 cm²'
        ],
        correctAnswer: 0,
        explanation: 'L\'aire d\'un cercle est donnée par la formule A = πr². Avec r = 7 cm, nous avons A = π × 7² = π × 49 ≈ 153,9 cm².'
      },
      {
        question: 'Deux triangles semblables ont un rapport de similitude de 3. Si l\'aire du petit triangle est de 16 cm², quelle est l\'aire du grand triangle ?',
        options: [
          '144 cm²',
          '48 cm²',
          '64 cm²',
          '96 cm²'
        ],
        correctAnswer: 0,
        explanation: 'Pour des triangles semblables, le rapport des aires est égal au carré du rapport de similitude. Si le rapport de similitude est de 3, alors le rapport des aires est de 3² = 9. Donc, l\'aire du grand triangle est 9 × 16 cm² = 144 cm².'
      }
    ]
  },
  {
    title: 'Statistiques et probabilités',
    description: 'Introduction aux concepts de base des statistiques et des probabilités',
    order: 3,
    lessons: [
      {
        title: 'Collecte et représentation des données',
        content: `
# Collecte et représentation des données

## Collecte de données

La collecte de données est le processus de rassemblement d'informations sur des variables d'intérêt, de manière systématique qui permet de répondre à des questions de recherche, de tester des hypothèses et d'évaluer des résultats.

### Méthodes de collecte de données

1. **Enquêtes** : recueil d'informations auprès d'un échantillon de personnes à l'aide de questionnaires
2. **Observations** : enregistrement systématique de phénomènes observables
3. **Expériences** : manipulation de variables pour observer leurs effets
4. **Utilisation de données existantes** : analyse de données déjà collectées

### Types de données

1. **Données qualitatives** : décrivent des caractéristiques ou des qualités (ex. couleur, sexe, opinion)
   - **Nominales** : catégories sans ordre naturel (ex. couleur des yeux)
   - **Ordinales** : catégories avec un ordre naturel (ex. niveau d'éducation)

2. **Données quantitatives** : expriment des quantités numériques
   - **Discrètes** : valeurs isolées, généralement des nombres entiers (ex. nombre d'enfants)
   - **Continues** : valeurs sur une échelle continue (ex. taille, poids)

## Représentation des données

### Tableaux de fréquences

Un tableau de fréquences présente la distribution des valeurs d'une variable.

#### Exemple

Voici les notes obtenues par 20 élèves à un examen : 12, 15, 8, 10, 14, 16, 9, 11, 13, 17, 10, 12, 14, 8, 15, 13, 11, 9, 12, 10

| Note | Effectif | Fréquence | Fréquence cumulée |
|------|----------|-----------|-------------------|
| 8    | 2        | 0,10      | 0,10              |
| 9    | 2        | 0,10      | 0,20              |
| 10   | 3        | 0,15      | 0,35              |
| 11   | 2        | 0,10      | 0,45              |
| 12   | 3        | 0,15      | 0,60              |
| 13   | 2        | 0,10      | 0,70              |
| 14   | 2        | 0,10      | 0,80              |
| 15   | 2        | 0,10      | 0,90              |
| 16   | 1        | 0,05      | 0,95              |
| 17   | 1        | 0,05      | 1,00              |
| Total| 20       | 1,00      |                   |

### Représentations graphiques

#### 1. Diagramme en bâtons

Un diagramme en bâtons représente les fréquences ou les effectifs par des bâtons verticaux ou horizontaux.

#### 2. Histogramme

Un histogramme est similaire à un diagramme en bâtons, mais il est utilisé pour des données continues regroupées en classes. Les bâtons sont adjacents et leur largeur représente l'amplitude de la classe.

#### 3. Diagramme circulaire (camembert)

Un diagramme circulaire représente les fréquences relatives sous forme de secteurs d'un cercle.

#### 4. Diagramme en ligne (polygone des fréquences)

Un diagramme en ligne représente l'évolution des fréquences ou des effectifs en reliant les points par des segments de droite.

#### 5. Boîte à moustaches

Une boîte à moustaches résume la distribution des données en montrant la médiane, les quartiles et les valeurs extrêmes.

## Exercices

1. Construisez un tableau de fréquences pour les données suivantes : 3, 5, 2, 4, 3, 5, 1, 2, 3, 4, 5, 3, 2, 1, 3.
2. Représentez les données du tableau de fréquences de l'exemple par un diagramme en bâtons.
3. Les données suivantes représentent les tailles (en cm) de 20 élèves : 165, 172, 168, 175, 170, 168, 173, 167, 169, 171, 174, 170, 172, 169, 168, 171, 173, 170, 172, 169. Regroupez ces données en classes et construisez un histogramme.
        `,
        order: 1
      },
      {
        title: 'Mesures de tendance centrale et de dispersion',
        content: `
# Mesures de tendance centrale et de dispersion

## Mesures de tendance centrale

Les mesures de tendance centrale sont des valeurs qui représentent le centre ou la valeur typique d'un ensemble de données.

### 1. Moyenne arithmétique

La moyenne arithmétique est la somme de toutes les valeurs divisée par le nombre de valeurs.

$\\bar{x} = \\frac{\\sum_{i=1}^{n} x_i}{n}$

#### Exemple

Calculons la moyenne des valeurs suivantes : 5, 8, 12, 15, 20

$\\bar{x} = \\frac{5 + 8 + 12 + 15 + 20}{5} = \\frac{60}{5} = 12$

### 2. Médiane

La médiane est la valeur qui divise l'ensemble de données en deux parties égales lorsque les données sont ordonnées.

- Si le nombre de valeurs est impair, la médiane est la valeur centrale.
- Si le nombre de valeurs est pair, la médiane est la moyenne des deux valeurs centrales.

#### Exemple

Trouvons la médiane des valeurs suivantes : 5, 8, 12, 15, 20

Les valeurs sont déjà ordonnées et leur nombre est impair (5), donc la médiane est la valeur centrale, soit 12.

Trouvons maintenant la médiane des valeurs suivantes : 5, 8, 12, 15, 20, 25

Les valeurs sont ordonnées et leur nombre est pair (6), donc la médiane est la moyenne des deux valeurs centrales, soit $\\frac{12 + 15}{2} = 13.5$

### 3. Mode

Le mode est la valeur qui apparaît le plus fréquemment dans l'ensemble de données.

#### Exemple

Trouvons le mode des valeurs suivantes : 5, 8, 12, 12, 15, 20, 20, 20

La valeur 20 apparaît trois fois, ce qui est plus fréquent que les autres valeurs, donc le mode est 20.

## Mesures de dispersion

Les mesures de dispersion indiquent à quel point les valeurs sont dispersées ou étalées autour de la tendance centrale.

### 1. Étendue

L'étendue est la différence entre la valeur maximale et la valeur minimale.

$\\text{Étendue} = x_{\\max} - x_{\\min}$

#### Exemple

Calculons l'étendue des valeurs suivantes : 5, 8, 12, 15, 20

$\\text{Étendue} = 20 - 5 = 15$

### 2. Écart interquartile

L'écart interquartile (EIQ) est la différence entre le troisième quartile (Q3) et le premier quartile (Q1).

$\\text{EIQ} = Q_3 - Q_1$

#### Exemple

Pour les valeurs 5, 8, 12, 15, 20 :
- Q1 (premier quartile) est la médiane de la première moitié des données : $\\frac{5 + 8}{2} = 6.5$
- Q3 (troisième quartile) est la médiane de la seconde moitié des données : $\\frac{15 + 20}{2} = 17.5$
- EIQ = 17.5 - 6.5 = 11

### 3. Variance et écart-type

La variance est la moyenne des carrés des écarts par rapport à la moyenne.

$\\sigma^2 = \\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})^2}{n}$

L'écart-type est la racine carrée de la variance.

$\\sigma = \\sqrt{\\frac{\\sum_{i=1}^{n} (x_i - \\bar{x})^2}{n}}$

#### Exemple

Calculons la variance et l'écart-type des valeurs suivantes : 5, 8, 12, 15, 20

La moyenne est $\\bar{x} = 12$

| $x_i$ | $x_i - \\bar{x}$ | $(x_i - \\bar{x})^2$ |
|-------|------------------|----------------------|
| 5     | -7               | 49                   |
| 8     | -4               | 16                   |
| 12    | 0                | 0                    |
| 15    | 3                | 9                    |
| 20    | 8                | 64                   |
| Total |                  | 138                  |

$\\sigma^2 = \\frac{138}{5} = 27.6$

$\\sigma = \\sqrt{27.6} \\approx 5.25$

## Exercices

1. Calculez la moyenne, la médiane et le mode des valeurs suivantes : 7, 9, 12, 15, 7, 8, 12, 15, 7, 9.
2. Calculez l'étendue et l'écart interquartile des valeurs suivantes : 10, 15, 20, 25, 30, 35, 40, 45, 50.
3. Calculez la variance et l'écart-type des valeurs suivantes : 2, 4, 6, 8, 10.
        `,
        order: 2
      },
      {
        title: 'Probabilités',
        content: `
# Probabilités

## Concepts de base

### Expérience aléatoire

Une expérience aléatoire est une expérience dont le résultat ne peut pas être prédit avec certitude avant sa réalisation.

### Espace échantillonnal

L'espace échantillonnal, noté Ω, est l'ensemble de tous les résultats possibles d'une expérience aléatoire.

### Événement

Un événement est un sous-ensemble de l'espace échantillonnal.

### Probabilité d'un événement

La probabilité d'un événement A, notée P(A), est une mesure de la chance que cet événement se produise. Elle est comprise entre 0 et 1.

- Si P(A) = 0, l'événement A est impossible.
- Si P(A) = 1, l'événement A est certain.

## Calcul des probabilités

### Approche classique (a priori)

Si tous les résultats élémentaires sont équiprobables, la probabilité d'un événement A est donnée par :

$P(A) = \\frac{\\text{nombre de cas favorables à A}}{\\text{nombre total de cas possibles}}$

#### Exemple

Quelle est la probabilité d'obtenir un nombre pair en lançant un dé équilibré à six faces ?

Les résultats possibles sont {1, 2, 3, 4, 5, 6}.
Les résultats favorables (nombres pairs) sont {2, 4, 6}.

$P(\\text{nombre pair}) = \\frac{3}{6} = \\frac{1}{2} = 0.5$

### Approche fréquentiste (a posteriori)

La probabilité d'un événement A est estimée par la fréquence relative de A dans un grand nombre de répétitions de l'expérience.

$P(A) \\approx \\frac{\\text{nombre d'occurrences de A}}{\\text{nombre total d'essais}}$

## Opérations sur les événements

### Événement complémentaire

Le complémentaire d'un événement A, noté $\\overline{A}$ ou $A^c$, est l'ensemble des résultats qui ne sont pas dans A.

$P(\\overline{A}) = 1 - P(A)$

### Union d'événements

L'union de deux événements A et B, notée $A \\cup B$, est l'événement qui se réalise si au moins l'un des événements A ou B se réalise.

$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$

### Intersection d'événements

L'intersection de deux événements A et B, notée $A \\cap B$, est l'événement qui se réalise si les deux événements A et B se réalisent simultanément.

### Événements mutuellement exclusifs

Deux événements A et B sont mutuellement exclusifs (ou disjoints) si leur intersection est vide, c'est-à-dire $A \\cap B = \\emptyset$.

Si A et B sont mutuellement exclusifs, alors $P(A \\cup B) = P(A) + P(B)$.

## Probabilité conditionnelle

La probabilité conditionnelle de A sachant B, notée $P(A|B)$, est la probabilité que l'événement A se réalise sachant que l'événement B s'est réalisé.

$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ pour $P(B) > 0$

### Événements indépendants

Deux événements A et B sont indépendants si la réalisation de l'un n'affecte pas la probabilité de réalisation de l'autre.

A et B sont indépendants si et seulement si $P(A \\cap B) = P(A) \\times P(B)$.

## Exercices

1. On lance deux dés équilibrés. Quelle est la probabilité que la somme des deux dés soit égale à 7 ?
2. Une urne contient 5 boules rouges et 3 boules bleues. On tire successivement et sans remise deux boules de l'urne. Quelle est la probabilité que les deux boules soient de la même couleur ?
3. Dans une classe, 60% des élèves étudient les mathématiques, 40% étudient la physique, et 25% étudient les deux matières. Quelle est la probabilité qu'un élève choisi au hasard étudie au moins l'une des deux matières ?
        `,
        order: 3
      },
      {
        title: 'Distributions de probabilité',
        content: `
# Distributions de probabilité

Une distribution de probabilité est une fonction qui associe à chaque valeur possible d'une variable aléatoire sa probabilité d'occurrence.

## Variables aléatoires

Une variable aléatoire est une fonction qui associe à chaque résultat d'une expérience aléatoire une valeur numérique.

### Types de variables aléatoires

1. **Variable aléatoire discrète** : peut prendre un nombre fini ou dénombrable de valeurs (ex. nombre de faces obtenues en lançant un dé)
2. **Variable aléatoire continue** : peut prendre n'importe quelle valeur dans un intervalle continu (ex. taille d'une personne)

## Distributions de probabilité discrètes

### 1. Distribution uniforme discrète

Dans une distribution uniforme discrète, toutes les valeurs possibles ont la même probabilité.

#### Exemple

Un dé équilibré à six faces suit une distribution uniforme discrète. Chaque face a une probabilité de 1/6.

### 2. Distribution binomiale

La distribution binomiale modélise le nombre de succès dans une série de n essais indépendants, chacun ayant une probabilité p de succès.

Une variable aléatoire X suit une loi binomiale de paramètres n et p, notée X ~ B(n, p), si :

$P(X = k) = C_n^k \\times p^k \\times (1-p)^{n-k}$ pour $k = 0, 1, 2, ..., n$

où $C_n^k = \\frac{n!}{k!(n-k)!}$ est le coefficient binomial.

#### Exemple

On lance une pièce équilibrée 5 fois. Soit X la variable aléatoire qui représente le nombre de faces "pile" obtenues. X suit une loi binomiale B(5, 0.5).

$P(X = 3) = C_5^3 \\times 0.5^3 \\times 0.5^2 = 10 \\times 0.125 \\times 0.25 = 0.3125$

### 3. Distribution de Poisson

La distribution de Poisson modélise le nombre d'événements qui se produisent dans un intervalle fixé (temps, espace, volume, etc.) si ces événements se produisent avec un taux constant et indépendamment les uns des autres.

Une variable aléatoire X suit une loi de Poisson de paramètre λ, notée X ~ P(λ), si :

$P(X = k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}$ pour $k = 0, 1, 2, ...$

où λ est le nombre moyen d'événements dans l'intervalle et e est la base du logarithme naturel.

#### Exemple

Le nombre d'appels reçus par un standard téléphonique pendant une heure suit une loi de Poisson de paramètre λ = 12 (en moyenne 12 appels par heure).

$P(X = 5) = \\frac{12^5 e^{-12}}{5!} \\approx 0.0389$

## Distributions de probabilité continues

### 1. Distribution uniforme continue

Dans une distribution uniforme continue, la densité de probabilité est constante sur un intervalle [a, b].

La fonction de densité de probabilité est :

$f(x) = \\frac{1}{b-a}$ pour $a \\leq x \\leq b$

$f(x) = 0$ ailleurs

### 2. Distribution normale (gaussienne)

La distribution normale est une distribution continue symétrique en forme de cloche, caractérisée par sa moyenne μ et son écart-type σ.

La fonction de densité de probabilité est :

$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2}$

#### Propriétés de la distribution normale

1. La distribution est symétrique autour de la moyenne μ.
2. La moyenne, la médiane et le mode sont tous égaux à μ.
3. Les points d'inflexion de la courbe sont à μ - σ et μ + σ.
4. Environ 68% des valeurs se situent à moins d'un écart-type de la moyenne.
5. Environ 95% des valeurs se situent à moins de deux écarts-types de la moyenne.
6. Environ 99.7% des valeurs se situent à moins de trois écarts-types de la moyenne.

#### Distribution normale standard

La distribution normale standard est une distribution normale avec μ = 0 et σ = 1, notée N(0, 1).

Toute variable aléatoire X suivant une loi normale N(μ, σ) peut être standardisée en calculant Z = (X - μ) / σ, qui suit alors une loi normale standard N(0, 1).

## Exercices

1. Une variable aléatoire X suit une loi binomiale B(10, 0.3). Calculez P(X = 4).
2. Le nombre de clients qui entrent dans un magasin par heure suit une loi de Poisson de paramètre λ = 15. Quelle est la probabilité qu'exactement 10 clients entrent dans le magasin pendant une heure donnée ?
3. Une variable aléatoire X suit une loi normale de moyenne μ = 70 et d'écart-type σ = 5. Calculez P(65 < X < 75).
        `,
        order: 4
      }
    ],
    exercises: [
      {
        question: 'Quelle est la médiane de l\'ensemble de données suivant : 12, 15, 18, 22, 25, 30, 35 ?',
        options: [
          '22',
          '20',
          '25',
          '23'
        ],
        correctAnswer: 0,
        explanation: 'Pour trouver la médiane d\'un ensemble de données ordonné, on identifie la valeur centrale. Ici, nous avons 7 valeurs (nombre impair), donc la médiane est la 4ème valeur, soit 22.'
      },
      {
        question: 'On lance un dé équilibré à six faces. Quelle est la probabilité d\'obtenir un nombre supérieur à 4 ?',
        options: [
          '1/3',
          '1/2',
          '2/3',
          '1/6'
        ],
        correctAnswer: 0,
        explanation: 'Les nombres supérieurs à 4 sont 5 et 6, soit 2 cas favorables sur 6 cas possibles. La probabilité est donc de 2/6 = 1/3.'
      },
      {
        question: 'Une variable aléatoire X suit une loi binomiale B(8, 0.25). Quelle est la probabilité P(X = 2) ?',
        options: [
          '0,311',
          '0,250',
          '0,144',
          '0,400'
        ],
        correctAnswer: 0,
        explanation: 'Pour une loi binomiale B(8, 0.25), P(X = 2) = C(8,2) × 0.25² × 0.75⁶ = 28 × 0.0625 × 0.1780 ≈ 0,311.'
      }
    ]
  },
  {
    title: 'Trigonométrie',
    description: 'Étude des relations entre les angles et les côtés des triangles',
    order: 4,
    lessons: [
      {
        title: 'Rapports trigonométriques',
        content: `
# Rapports trigonométriques

## Définition des rapports trigonométriques dans un triangle rectangle

Dans un triangle rectangle, les rapports trigonométriques sont définis par rapport à un angle aigu θ.

Soit un triangle rectangle avec un angle θ. On désigne par :
- **hypoténuse** : le côté opposé à l'angle droit
- **adjacent** : le côté adjacent à l'angle θ (autre que l'hypoténuse)
- **opposé** : le côté opposé à l'angle θ

Les trois rapports trigonométriques fondamentaux sont :

1. **Sinus (sin)** : rapport du côté opposé à l'angle sur l'hypoténuse
   $\\sin(\\theta) = \\frac{\\text{opposé}}{\\text{hypoténuse}}$

2. **Cosinus (cos)** : rapport du côté adjacent à l'angle sur l'hypoténuse
   $\\cos(\\theta) = \\frac{\\text{adjacent}}{\\text{hypoténuse}}$

3. **Tangente (tan)** : rapport du côté opposé à l'angle sur le côté adjacent
   $\\tan(\\theta) = \\frac{\\text{opposé}}{\\text{adjacent}} = \\frac{\\sin(\\theta)}{\\cos(\\theta)}$

## Valeurs remarquables

| Angle θ | sin(θ) | cos(θ) | tan(θ) |
|---------|--------|--------|--------|
| 0°      | 0      | 1      | 0      |
| 30°     | 1/2    | √3/2   | 1/√3   |
| 45°     | 1/√2   | 1/√2   | 1      |
| 60°     | √3/2   | 1/2    | √3     |
| 90°     | 1      | 0      | ∞      |

## Relations fondamentales

1. **Relation fondamentale** : $\\sin^2(\\theta) + \\cos^2(\\theta) = 1$

2. **Tangente** : $\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}$

## Angles complémentaires

Deux angles sont complémentaires si leur somme est égale à 90°.

Si α et β sont complémentaires (α + β = 90°), alors :
- $\\sin(\\alpha) = \\cos(\\beta)$
- $\\cos(\\alpha) = \\sin(\\beta)$
- $\\tan(\\alpha) = \\frac{1}{\\tan(\\beta)}$

## Utilisation des rapports trigonométriques

### Calcul des côtés d'un triangle rectangle

Si on connaît un angle aigu et un côté d'un triangle rectangle, on peut calculer les autres côtés en utilisant les rapports trigonométriques.

#### Exemple

Dans un triangle rectangle, l'un des angles aigus mesure 30° et l'hypoténuse mesure 10 cm. Calculons les deux autres côtés.

- Côté adjacent à l'angle de 30° : $\\cos(30°) = \\frac{\\text{adjacent}}{\\text{hypoténuse}} \\Rightarrow \\text{adjacent} = \\text{hypoténuse} \\times \\cos(30°) = 10 \\times \\frac{\\sqrt{3}}{2} = 5\\sqrt{3} \\approx 8,66$ cm

- Côté opposé à l'angle de 30° : $\\sin(30°) = \\frac{\\text{opposé}}{\\text{hypoténuse}} \\Rightarrow \\text{opposé} = \\text{hypoténuse} \\times \\sin(30°) = 10 \\times \\frac{1}{2} = 5$ cm

### Calcul des angles d'un triangle rectangle

Si on connaît deux côtés d'un triangle rectangle, on peut calculer les angles aigus en utilisant les rapports trigonométriques inverses.

#### Exemple

Dans un triangle rectangle, les deux cathètes mesurent 8 cm et 15 cm. Calculons les angles aigus.

- Hypoténuse (par le théorème de Pythagore) : $c = \\sqrt{a^2 + b^2} = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17$ cm

- Angle opposé au côté de 8 cm : $\\sin(\\alpha) = \\frac{\\text{opposé}}{\\text{hypoténuse}} = \\frac{8}{17} \\Rightarrow \\alpha = \\arcsin(\\frac{8}{17}) \\approx 28,1°$

- Angle opposé au côté de 15 cm : $\\sin(\\beta) = \\frac{\\text{opposé}}{\\text{hypoténuse}} = \\frac{15}{17} \\Rightarrow \\beta = \\arcsin(\\frac{15}{17}) \\approx 61,9°$

Vérification : $\\alpha + \\beta = 28,1° + 61,9° = 90°$

## Exercices

1. Dans un triangle rectangle, l'un des angles aigus mesure 45° et l'hypoténuse mesure 12 cm. Calculez les deux autres côtés.
2. Dans un triangle rectangle, les deux cathètes mesurent 5 cm et 12 cm. Calculez les angles aigus.
3. Un observateur se trouve à 100 m d'un bâtiment. L'angle d'élévation du sommet du bâtiment est de 30°. Quelle est la hauteur du bâtiment ?
        `,
        order: 1
      },
      {
        title: 'Cercle trigonométrique',
        content: `
# Cercle trigonométrique

## Définition du cercle trigonométrique

Le cercle trigonométrique est un cercle de rayon 1 centré à l'origine d'un repère orthonormé. Il permet de généraliser les définitions des rapports trigonométriques à tous les angles, pas seulement aux angles aigus des triangles rectangles.

Dans le cercle trigonométrique :
- Les angles sont mesurés à partir de l'axe des abscisses positives (axe x), dans le sens antihoraire.
- Un angle θ correspond à un point M(x, y) sur le cercle.
- Les coordonnées du point M sont : x = cos(θ) et y = sin(θ).

## Définition des fonctions trigonométriques pour tous les angles

Pour tout angle θ, si M(x, y) est le point du cercle trigonométrique correspondant à θ, alors :
- sin(θ) = y (ordonnée du point M)
- cos(θ) = x (abscisse du point M)
- tan(θ) = y/x = sin(θ)/cos(θ) (si x ≠ 0)

## Propriétés des fonctions trigonométriques

### Périodicité

- La fonction sinus est périodique de période 2π : sin(θ + 2π) = sin(θ)
- La fonction cosinus est périodique de période 2π : cos(θ + 2π) = cos(θ)
- La fonction tangente est périodique de période π : tan(θ + π) = tan(θ)

### Parité

- La fonction sinus est impaire : sin(-θ) = -sin(θ)
- La fonction cosinus est paire : cos(-θ) = cos(θ)
- La fonction tangente est impaire : tan(-θ) = -tan(θ)

### Valeurs remarquables

| Angle θ (en radians) | sin(θ) | cos(θ) | tan(θ) |
|----------------------|--------|--------|--------|
| 0                    | 0      | 1      | 0      |
| π/6 (30°)            | 1/2    | √3/2   | 1/√3   |
| π/4 (45°)            | 1/√2   | 1/√2   | 1      |
| π/3 (60°)            | √3/2   | 1/2    | √3     |
| π/2 (90°)            | 1      | 0      | ∞      |
| π (180°)             | 0      | -1     | 0      |
| 3π/2 (270°)          | -1     | 0      | ∞      |
| 2π (360°)            | 0      | 1      | 0      |

## Relations entre les fonctions trigonométriques

1. **Relation fondamentale** : sin²(θ) + cos²(θ) = 1
2. **Tangente** : tan(θ) = sin(θ)/cos(θ) (si cos(θ) ≠ 0)
3. **Cotangente** : cot(θ) = cos(θ)/sin(θ) = 1/tan(θ) (si sin(θ) ≠ 0)

## Formules d'addition et de soustraction

### Addition

- sin(α + β) = sin(α)cos(β) + cos(α)sin(β)
- cos(α + β) = cos(α)cos(β) - sin(α)sin(β)
- tan(α + β) = (tan(α) + tan(β))/(1 - tan(α)tan(β)) (si tan(α)tan(β) ≠ 1)

### Soustraction

- sin(α - β) = sin(α)cos(β) - cos(α)sin(β)
- cos(α - β) = cos(α)cos(β) + sin(α)sin(β)
- tan(α - β) = (tan(α) - tan(β))/(1 + tan(α)tan(β)) (si tan(α)tan(β) ≠ -1)

## Formules de duplication

- sin(2θ) = 2sin(θ)cos(θ)
- cos(2θ) = cos²(θ) - sin²(θ) = 2cos²(θ) - 1 = 1 - 2sin²(θ)
- tan(2θ) = 2tan(θ)/(1 - tan²(θ)) (si tan²(θ) ≠ 1)

## Exercices

1. Calculez sin(π/12) en utilisant les formules d'addition et de soustraction.
2. Vérifiez que sin²(π/3) + cos²(π/3) = 1.
3. Calculez cos(π/12) en utilisant les formules d'addition et de soustraction.
        `,
        order: 2
      },
      {
        title: 'Résolution de triangles',
        content: `
# Résolution de triangles

La résolution d'un triangle consiste à déterminer tous ses éléments (côtés et angles) à partir de certains éléments connus.

## Triangles rectangles

Dans un triangle rectangle, on peut utiliser les rapports trigonométriques et le théorème de Pythagore.

### Théorème de Pythagore

Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.

Si a et b sont les cathètes et c est l'hypoténuse, alors :
$c^2 = a^2 + b^2$

### Rapports trigonométriques

Si θ est un angle aigu du triangle rectangle, alors :
- $\\sin(\\theta) = \\frac{\\text{opposé}}{\\text{hypoténuse}}$
- $\\cos(\\theta) = \\frac{\\text{adjacent}}{\\text{hypoténuse}}$
- $\\tan(\\theta) = \\frac{\\text{opposé}}{\\text{adjacent}}$

## Triangles quelconques

Pour les triangles non rectangles, on utilise la loi des sinus et la loi des cosinus.

### Loi des sinus

Dans tout triangle, les longueurs des côtés sont proportionnelles aux sinus des angles opposés.

Si a, b, c sont les longueurs des côtés et A, B, C sont les angles opposés respectivement à ces côtés, alors :
$\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)} = 2R$

où R est le rayon du cercle circonscrit au triangle.

### Loi des cosinus

Dans tout triangle, le carré de la longueur d'un côté est égal à la somme des carrés des longueurs des deux autres côtés, moins deux fois le produit de ces longueurs multiplié par le cosinus de l'angle compris.

Si a, b, c sont les longueurs des côtés et A, B, C sont les angles opposés respectivement à ces côtés, alors :
- $a^2 = b^2 + c^2 - 2bc\\cos(A)$
- $b^2 = a^2 + c^2 - 2ac\\cos(B)$
- $c^2 = a^2 + b^2 - 2ab\\cos(C)$

### Formule de l'aire

L'aire d'un triangle peut être calculée de plusieurs façons :

1. **Formule de base** : $\\text{Aire} = \\frac{1}{2} \\times \\text{base} \\times \\text{hauteur}$

2. **Formule avec deux côtés et l'angle compris** : $\\text{Aire} = \\frac{1}{2} \\times a \\times b \\times \\sin(C)$

3. **Formule de Héron** : $\\text{Aire} = \\sqrt{p(p-a)(p-b)(p-c)}$
   où $p = \\frac{a+b+c}{2}$ est le demi-périmètre du triangle.

## Cas de résolution

### Cas 1 : Connaissant les trois côtés (SSS)

Si on connaît les trois côtés a, b, c, on peut calculer les angles en utilisant la loi des cosinus :
- $\\cos(A) = \\frac{b^2 + c^2 - a^2}{2bc}$
- $\\cos(B) = \\frac{a^2 + c^2 - b^2}{2ac}$
- $\\cos(C) = \\frac{a^2 + b^2 - c^2}{2ab}$

### Cas 2 : Connaissant deux côtés et l'angle compris (SAS)

Si on connaît deux côtés a, b et l'angle compris C, on peut calculer :
- Le troisième côté en utilisant la loi des cosinus : $c^2 = a^2 + b^2 - 2ab\\cos(C)$
- Les autres angles en utilisant la loi des sinus : $\\frac{\\sin(A)}{a} = \\frac{\\sin(B)}{b} = \\frac{\\sin(C)}{c}$

### Cas 3 : Connaissant deux angles et un côté (ASA ou AAS)

Si on connaît deux angles A, B et un côté a, on peut calculer :
- Le troisième angle : $C = 180° - A - B$
- Les autres côtés en utilisant la loi des sinus : $\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)}$

### Cas 4 : Connaissant deux côtés et un angle opposé à l'un d'eux (SSA)

Ce cas peut avoir 0, 1 ou 2 solutions, selon les valeurs données.

Si on connaît deux côtés a, b et l'angle A (opposé au côté a), on utilise la loi des sinus pour trouver l'angle B :
$\\sin(B) = \\frac{b \\times \\sin(A)}{a}$

- Si $\\sin(B) > 1$, il n'y a pas de solution.
- Si $\\sin(B) = 1$, il y a une solution unique (triangle rectangle).
- Si $\\sin(B) < 1$, il y a deux solutions possibles pour B : B et 180° - B, sauf si b < a\\sin(A) ou si b ≥ a, auquel cas il n'y a qu'une solution.

## Exercices

1. Dans un triangle ABC, on a a = 8 cm, b = 6 cm et C = 30°. Calculez le côté c et les angles A et B.
2. Dans un triangle ABC, on a A = 45°, B = 60° et c = 10 cm. Calculez les côtés a et b et l'angle C.
3. Dans un triangle ABC, on a a = 7 cm, b = 9 cm et c = 12 cm. Calculez les angles A, B et C.
        `,
        order: 3
      },
      {
        title: 'Applications de la trigonométrie',
        content: `
# Applications de la trigonométrie

La trigonométrie a de nombreuses applications dans divers domaines, notamment en physique, en ingénierie, en navigation, en astronomie et dans la vie quotidienne.

## Calcul de distances inaccessibles

### Hauteur d'un objet vertical

Pour calculer la hauteur d'un objet vertical (comme un bâtiment, un arbre ou un poteau), on peut utiliser la tangente de l'angle d'élévation.

Si on se trouve à une distance d de la base de l'objet et que l'angle d'élévation du sommet est α, alors la hauteur h de l'objet est donnée par :
$h = d \\times \\tan(\\alpha)$

Si on tient compte de la hauteur de l'observateur h₀, alors :
$h = h_0 + d \\times \\tan(\\alpha)$

#### Exemple

Un observateur de 1,75 m de hauteur se trouve à 30 m d'un bâtiment. L'angle d'élévation du sommet du bâtiment est de 35°. Quelle est la hauteur du bâtiment ?

$h = h_0 + d \\times \\tan(\\alpha) = 1,75 + 30 \\times \\tan(35°) = 1,75 + 30 \\times 0,7002 = 1,75 + 21,006 = 22,756$ m

### Distance entre deux points inaccessibles

Pour calculer la distance entre deux points inaccessibles, on peut utiliser la triangulation.

On choisit un point C accessible depuis lequel on peut voir les deux points inaccessibles A et B. On mesure les distances CA et CB, ainsi que l'angle ACB. Ensuite, on utilise la loi des cosinus pour calculer la distance AB :

$AB^2 = CA^2 + CB^2 - 2 \\times CA \\times CB \\times \\cos(ACB)$

## Navigation

### Cap et route

En navigation maritime ou aérienne, la trigonométrie est utilisée pour calculer le cap (direction) et la route (trajectoire) d'un navire ou d'un avion.

Si un navire se déplace d'un point A à un point B, le cap est l'angle que fait la direction AB avec le nord. Si les coordonnées de A sont (x₁, y₁) et celles de B sont (x₂, y₂), alors le cap θ est donné par :

$\\theta = \\arctan\\left(\\frac{x_2 - x_1}{y_2 - y_1}\\right)$

Il faut ajuster cette valeur en fonction du quadrant dans lequel se trouve le vecteur AB.

### Correction de dérive

Lorsqu'un navire ou un avion est soumis à un vent ou à un courant latéral, il subit une dérive. Pour maintenir la route souhaitée, il faut appliquer une correction de cap.

Si la vitesse du navire est v, la vitesse du courant est w et l'angle entre la direction du courant et la route souhaitée est α, alors l'angle de correction β est donné par :

$\\sin(\\beta) = \\frac{w \\times \\sin(\\alpha)}{v}$

## Physique

### Mouvement harmonique simple

Le mouvement harmonique simple, comme celui d'un pendule ou d'un ressort, peut être décrit par des fonctions trigonométriques.

La position x d'un objet en mouvement harmonique simple en fonction du temps t est donnée par :

$x(t) = A \\times \\sin(\\omega t + \\phi)$

où A est l'amplitude, ω est la pulsation (ω = 2πf, où f est la fréquence) et φ est la phase initiale.

### Ondes

Les ondes, qu'elles soient mécaniques (comme les ondes sonores) ou électromagnétiques (comme la lumière), peuvent être décrites par des fonctions trigonométriques.

Une onde sinusoïdale se propageant dans la direction x peut être représentée par :

$y(x, t) = A \\times \\sin(kx - \\omega t + \\phi)$

où A est l'amplitude, k est le nombre d'onde (k = 2π/λ, où λ est la longueur d'onde), ω est la pulsation et φ est la phase initiale.

## Astronomie

### Position des astres

La position des astres dans le ciel peut être déterminée à l'aide de la trigonométrie sphérique, qui est l'étude des triangles sur une sphère.

Les coordonnées équatoriales d'un astre (ascension droite α et déclinaison δ) peuvent être converties en coordonnées horizontales (azimut A et hauteur h) en utilisant les formules suivantes :

$\\sin(h) = \\sin(\\phi) \\times \\sin(\\delta) + \\cos(\\phi) \\times \\cos(\\delta) \\times \\cos(H)$

$\\sin(A) = -\\frac{\\cos(\\delta) \\times \\sin(H)}{\\cos(h)}$

où φ est la latitude de l'observateur et H est l'angle horaire de l'astre.

### Parallaxe

La parallaxe est le déplacement apparent d'un objet lorsqu'on change de point d'observation. Elle est utilisée pour mesurer la distance des étoiles proches.

Si p est l'angle de parallaxe (en secondes d'arc) d'une étoile, alors sa distance d en parsecs est donnée par :

$d = \\frac{1}{p}$

## Exercices

1. Un observateur se trouve à 50 m d'une tour. L'angle d'élévation du sommet de la tour est de 28°. Quelle est la hauteur de la tour ?
2. Deux points A et B sont situés de part et d'autre d'une rivière. Un point C est choisi sur la même rive que A. On mesure AC = 100 m, BC = 150 m et l'angle ACB = 110°. Quelle est la largeur AB de la rivière ?
3. Un avion vole à une vitesse de 800 km/h. Un vent souffle à 100 km/h dans une direction faisant un angle de 30° avec la route souhaitée. Quel angle de correction le pilote doit-il appliquer pour maintenir sa route ?
        `,
        order: 4
      }
    ],
    exercises: [
      {
        question: 'Dans un triangle rectangle, l\'un des angles aigus mesure 30° et l\'hypoténuse mesure 8 cm. Quelle est la longueur du côté opposé à cet angle ?',
        options: [
          '4 cm',
          '6,93 cm',
          '8 cm',
          '2 cm'
        ],
        correctAnswer: 0,
        explanation: 'Dans un triangle rectangle, le côté opposé à un angle de 30° est égal à l\'hypoténuse multipliée par sin(30°). Donc, côté opposé = 8 × sin(30°) = 8 × 0,5 = 4 cm.'
      },
      {
        question: 'Dans un triangle quelconque ABC, on a a = 6 cm, b = 8 cm et C = 60°. Quelle est la longueur du côté c ?',
        options: [
          '7,21 cm',
          '10 cm',
          '14 cm',
          '6,93 cm'
        ],
        correctAnswer: 0,
        explanation: 'On utilise la loi des cosinus : c² = a² + b² - 2ab×cos(C) = 6² + 8² - 2×6×8×cos(60°) = 36 + 64 - 96×0,5 = 100 - 48 = 52. Donc c = √52 ≈ 7,21 cm.'
      },
      {
        question: 'Un observateur se trouve à 40 m d\'un bâtiment. L\'angle d\'élévation du sommet du bâtiment est de 35°. Quelle est la hauteur du bâtiment (arrondie au mètre près) ?',
        options: [
          '28 m',
          '23 m',
          '32 m',
          '40 m'
        ],
        correctAnswer: 0,
        explanation: 'La hauteur du bâtiment est donnée par h = d × tan(α) = 40 × tan(35°) = 40 × 0,7002 = 28,008 m, soit environ 28 m.'
      }
    ]
  }
];

// Fonction pour créer un utilisateur administrateur
const createAdmin = async () => {
  try {
    // Créer un nouvel administrateur
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const admin = new User({
      firstName: 'Admin',
      lastName: 'Cambridge',
      email: 'admin@cambridge-edu.com',
      password: hashedPassword,
      role: 'admin'
    });
    
    await admin.save();
    console.log('Administrateur créé avec succès');
    return admin;
  } catch (err) {
    console.error('Erreur lors de la création de l\'administrateur:', err.message);
    throw err;
  }
};

// Fonction pour créer les cours
const createCourses = async (admin) => {
  try {
    // Créer les cours
    const createdCourses = [];
    
    for (const courseData of courses) {
      const course = new Course({
        ...courseData,
        createdBy: admin._id
      });
      
      const savedCourse = await course.save();
      createdCourses.push(savedCourse);
      console.log(`Cours "${courseData.title}" créé avec succès`);
    }
    
    return createdCourses;
  } catch (err) {
    console.error('Erreur lors de la création des cours:', err.message);
    throw err;
  }
};

// Fonction pour créer les modules pour le cours de mathématiques
const createMathModules = async (courses) => {
  try {
    // Récupérer le cours de mathématiques
    const mathCourse = courses.find(course => course.slug === 'mathematics-syllabus-d');
    
    if (!mathCourse) {
      console.log('Cours de mathématiques non trouvé');
      return;
    }
    
    // Créer les modules
    for (const moduleData of mathModules) {
      const module = new Module({
        ...moduleData,
        course: mathCourse._id
      });
      
      const savedModule = await module.save();
      
      // Ajouter le module au cours
      mathCourse.modules.push(savedModule._id);
      
      console.log(`Module "${moduleData.title}" créé avec succès`);
    }
    
    await mathCourse.save();
    console.log('Modules ajoutés au cours de mathématiques');
  } catch (err) {
    console.error('Erreur lors de la création des modules:', err.message);
    throw err;
  }
};

// Fonction principale pour initialiser les données
const initializeData = async () => {
  try {
    // Démarrer le serveur MongoDB en mémoire
    const mongoServer = await startMongoServer();
    
    // Créer l'administrateur
    const admin = await createAdmin();
    
    // Créer les cours
    const createdCourses = await createCourses(admin);
    
    // Créer les modules pour le cours de mathématiques
    await createMathModules(createdCourses);
    
    console.log('Initialisation des données terminée');
    
    // Afficher l'URI de connexion pour le serveur frontend
    console.log(`\nURI de connexion MongoDB: ${mongoServer.getUri()}`);
    console.log('\nIdentifiants administrateur:');
    console.log('Email: admin@cambridge-edu.com');
    console.log('Mot de passe: admin123');
    
    // Ne pas fermer la connexion pour permettre au serveur de fonctionner
    // mongoose.disconnect();
    // await mongoServer.stop();
  } catch (err) {
    console.error('Erreur lors de l\'initialisation des données:', err.message);
    process.exit(1);
  }
};

// Exécuter la fonction d'initialisation
initializeData();
