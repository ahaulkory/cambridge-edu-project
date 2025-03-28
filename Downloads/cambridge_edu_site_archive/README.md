# Guide d'utilisation du site éducatif Cambridge

## Présentation du site

Ce site éducatif a été conçu pour les étudiants préparant le School Certificate du Cambridge International Examinations. Il propose des cours gratuits dans les matières suivantes :

- Mathematics (Syllabus D)
- Business Studies
- Economics
- English Language
- Art & Design
- Travel & Tourism

Le site est entièrement responsive et peut être consulté sur ordinateur, tablette ou téléphone mobile.

## Accès au site

Le site est accessible à l'adresse suivante :
http://5000-ih3p0enfye30o1ntm8gj7-e421e767.manus.computer

## Fonctionnalités pour les étudiants

- Consultation des cours par matière
- Accès aux leçons détaillées avec contenu formaté
- Exercices interactifs pour tester ses connaissances
- Suivi de progression personnalisé
- Inscription et création de compte personnel

## Fonctionnalités pour les administrateurs

- Gestion complète des cours et des modules
- Ajout, modification et suppression de contenu
- Gestion des utilisateurs
- Téléchargement de ressources pédagogiques

## Identifiants administrateur

Pour accéder à l'interface d'administration et modifier le contenu du site :

- Email : admin@cambridge-edu.com
- Mot de passe : admin123

## Comment modifier le contenu après la session

1. Connectez-vous avec les identifiants administrateur
2. Accédez au panneau d'administration via le menu utilisateur
3. Sélectionnez la section que vous souhaitez modifier (Cours, Modules, Utilisateurs)
4. Utilisez les formulaires pour ajouter, modifier ou supprimer du contenu

## Structure technique du projet

Le projet est organisé comme suit :

- `/frontend` : Interface utilisateur React
- `/backend` : API REST Node.js/Express
- `/data` : Données extraites du site Cambridge International
- `/design` : Documents de conception et maquettes

## Comment exécuter le projet localement

1. Clonez le dépôt
2. Installez les dépendances : `npm install`
3. Initialisez la base de données : `npm run seed`
4. Démarrez le serveur : `npm run start`
5. Accédez au site via http://localhost:5000

## Technologies utilisées

- Frontend : React.js, Bootstrap
- Backend : Node.js, Express
- Base de données : MongoDB (en mémoire)
- Authentification : JWT

## Remarques importantes

- La base de données est en mémoire, ce qui signifie que les données sont réinitialisées à chaque redémarrage du serveur
- Pour une utilisation en production, il est recommandé de configurer une base de données MongoDB persistante
- Le site est conçu pour être facilement modifiable et extensible
