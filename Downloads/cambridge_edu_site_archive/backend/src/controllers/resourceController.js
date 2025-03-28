const Resource = require('../models/Resource');
const Course = require('../models/Course');
const path = require('path');
const fs = require('fs');

// @desc    Obtenir toutes les ressources d'un cours
// @route   GET /api/courses/:courseId/resources
// @access  Public
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ course: req.params.courseId }).sort({ uploadedAt: -1 });
    
    res.json({
      success: true,
      count: resources.length,
      data: resources
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Obtenir une ressource spécifique
// @route   GET /api/resources/:id
// @access  Public
exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Ressource non trouvée'
      });
    }
    
    res.json({
      success: true,
      data: resource
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Télécharger une ressource
// @route   POST /api/courses/:courseId/resources
// @access  Private (Admin)
exports.uploadResource = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Cours non trouvé'
      });
    }
    
    // Vérifier si un fichier a été téléchargé
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez télécharger un fichier'
      });
    }
    
    // Créer la nouvelle ressource
    const resource = new Resource({
      title: req.body.title,
      description: req.body.description || '',
      type: req.body.type,
      course: req.params.courseId,
      file: req.file.path,
      fileType: path.extname(req.file.originalname).substring(1),
      uploadedBy: req.user.id
    });
    
    await resource.save();
    
    // Ajouter la ressource au cours
    course.resources.push(resource._id);
    await course.save();
    
    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Supprimer une ressource
// @route   DELETE /api/resources/:id
// @access  Private (Admin)
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Ressource non trouvée'
      });
    }
    
    // Supprimer le fichier physique
    if (fs.existsSync(resource.file)) {
      fs.unlinkSync(resource.file);
    }
    
    // Supprimer la ressource de la base de données
    await resource.remove();
    
    // Supprimer la référence à la ressource dans le cours
    const course = await Course.findById(resource.course);
    if (course) {
      course.resources = course.resources.filter(
        resourceId => resourceId.toString() !== req.params.id
      );
      await course.save();
    }
    
    res.json({
      success: true,
      message: 'Ressource supprimée avec succès'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Télécharger une ressource
// @route   GET /api/resources/:id/download
// @access  Public
exports.downloadResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Ressource non trouvée'
      });
    }
    
    // Vérifier si le fichier existe
    if (!fs.existsSync(resource.file)) {
      return res.status(404).json({
        success: false,
        message: 'Fichier non trouvé'
      });
    }
    
    // Envoyer le fichier
    res.download(resource.file, `${resource.title}.${resource.fileType}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};
