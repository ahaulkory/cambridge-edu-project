const Module = require('../models/Module');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Obtenir tous les modules d'un cours
// @route   GET /api/courses/:courseId/modules
// @access  Public
exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find({ course: req.params.courseId }).sort({ order: 1 });
    
    res.json({
      success: true,
      count: modules.length,
      data: modules
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Obtenir un module spécifique
// @route   GET /api/modules/:id
// @access  Public
exports.getModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: module
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Créer un nouveau module
// @route   POST /api/courses/:courseId/modules
// @access  Private (Admin)
exports.createModule = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Cours non trouvé'
      });
    }
    
    // Déterminer l'ordre du nouveau module
    const moduleCount = await Module.countDocuments({ course: req.params.courseId });
    
    const module = new Module({
      title: req.body.title,
      course: req.params.courseId,
      description: req.body.description,
      order: moduleCount + 1,
      lessons: req.body.lessons || [],
      exercises: req.body.exercises || []
    });
    
    await module.save();
    
    // Ajouter le module au cours
    course.modules.push(module._id);
    await course.save();
    
    res.status(201).json({
      success: true,
      data: module
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Mettre à jour un module
// @route   PUT /api/modules/:id
// @access  Private (Admin)
exports.updateModule = async (req, res) => {
  try {
    let module = await Module.findById(req.params.id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module non trouvé'
      });
    }
    
    module = await Module.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: module
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Supprimer un module
// @route   DELETE /api/modules/:id
// @access  Private (Admin)
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);
    
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module non trouvé'
      });
    }
    
    // Supprimer le module du cours
    const course = await Course.findById(module.course);
    if (course) {
      course.modules = course.modules.filter(
        moduleId => moduleId.toString() !== req.params.id
      );
      await course.save();
    }
    
    // Supprimer le module
    await module.remove();
    
    // Réorganiser l'ordre des modules restants
    const remainingModules = await Module.find({ course: module.course }).sort({ order: 1 });
    for (let i = 0; i < remainingModules.length; i++) {
      remainingModules[i].order = i + 1;
      await remainingModules[i].save();
    }
    
    res.json({
      success: true,
      message: 'Module supprimé avec succès'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Mettre à jour la progression d'un utilisateur dans un module
// @route   PUT /api/modules/:id/progress
// @access  Private
exports.updateProgress = async (req, res) => {
  try {
    const { lessonIndex, completed } = req.body;
    
    const module = await Module.findById(req.params.id);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module non trouvé'
      });
    }
    
    // Mettre à jour la progression de l'utilisateur pour ce cours
    const user = await User.findById(req.user.id);
    const courseIndex = user.enrolledCourses.findIndex(
      course => course.course.toString() === module.course.toString()
    );
    
    if (courseIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'Vous n\'êtes pas inscrit à ce cours'
      });
    }
    
    // Calculer la nouvelle progression
    const totalLessons = module.lessons.length;
    const completedLessons = module.lessons.filter((_, index) => 
      index < lessonIndex || (index === lessonIndex && completed)
    ).length;
    
    // Mettre à jour la progression pour ce module
    const moduleProgress = Math.round((completedLessons / totalLessons) * 100);
    
    // Calculer la progression globale du cours
    const allModules = await Module.find({ course: module.course });
    let totalProgress = 0;
    
    for (const mod of allModules) {
      if (mod._id.toString() === module._id.toString()) {
        totalProgress += moduleProgress;
      } else {
        // Pour les autres modules, utiliser la progression existante ou 0
        totalProgress += 0; // À remplacer par la progression réelle stockée
      }
    }
    
    const courseProgress = Math.round(totalProgress / allModules.length);
    
    // Mettre à jour la progression du cours pour l'utilisateur
    user.enrolledCourses[courseIndex].progress = courseProgress;
    await user.save();
    
    res.json({
      success: true,
      data: {
        moduleProgress,
        courseProgress
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};
