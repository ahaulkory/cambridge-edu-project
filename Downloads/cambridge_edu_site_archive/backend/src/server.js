const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const moduleRoutes = require('./routes/modules');
const resourceRoutes = require('./routes/resources');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Démarrer le serveur MongoDB en mémoire
const startServer = async () => {
  try {
    // Créer une instance de MongoMemoryServer
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connexion à MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log(`Connexion à MongoDB en mémoire établie: ${mongoUri}`);
    
    // Routes API
    app.use('/api/auth', authRoutes);
    app.use('/api/courses', courseRoutes);
    app.use('/api/modules', moduleRoutes);
    app.use('/api/resources', resourceRoutes);
    
    // Servir les fichiers statiques en production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../../frontend/build')));
      
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
      });
    }
    
    // Définir le port
    const PORT = process.env.PORT || 5000;
    
    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
    
    return mongoServer;
  } catch (err) {
    console.error('Erreur lors du démarrage du serveur:', err.message);
    process.exit(1);
  }
};

// Exécuter le serveur
startServer();
