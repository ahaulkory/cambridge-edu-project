const Course = require('../models/Course');
const Module = require('../models/Module');
const User = require('../models/User');

// @desc    Obtenir tous les cours
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Obtenir un cours par son slug
// @route   GET /api/courses/:slug
// @access  Public
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate('modules')
      .populate('resources');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Cours non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Créer un nouveau cours
// @route   POST /api/courses
// @access  Private (Admin)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category, objectives, image } = req.body;
    
    // Créer le slug à partir du titre
    const slug = title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
    
    // Vérifier si un cours avec ce slug existe déjà
    const courseExists = await Course.findOne({ slug });
    if (courseExists) {
      return res.status(400).json({
        success: false,
        message: 'Un cours avec ce titre existe déjà'
      });
    }
    
    // Créer le nouveau cours
    const course = new Course({
      title,
      slug,
      description,
      category,
      objectives: objectives || [],
      image: image || '/assets/images/course-placeholder.jpg',
      createdBy: req.user.id
    });
    
    await course.save();
    
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Mettre à jour un cours
// @route   PUT /api/courses/:id
// @access  Private (Admin)
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Cours non trouvé'
      });
    }
    
    // Mettre à jour le cours
    course = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: course
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    Supprimer un cours
// @route   DELETE /api/courses/:id
// @access  Private (Admin)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Cours non trouvé'
      });
    }
    
    // Supprimer tous les modules associés
    await Module.deleteMany({ course: req.params.id });
    
    // Supprimer le cours
    await course.remove();
    
    res.json({
      success: true,
      message: 'Cours supprimé avec succès'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

// @desc    S'inscrire à un cours
// @route   POST /api/courses/:id/enroll
// @access  Private
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Cours non trouvé'
      });
    }
    
    // Vérifier si l'utilisateur est déjà inscrit
    const user = await User.findById(req.user.id);
    const isEnrolled = user.enrolledCourses.some(
      enrolledCourse => enrolledCourse.course.toString() === req.params.id
    );
    
    if (isEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'Vous êtes déjà inscrit à ce cours'
      });
    }
    
    // Ajouter le cours aux cours inscrits de l'utilisateur
    user.enrolledCourses.push({
      course: req.params.id,
      progress: 0,
      enrolledDate: Date.now()
    });
    
    await user.save();
    
    // Incrémenter le nombre d'étudiants inscrits au cours
    course.enrolledStudents += 1;
    await course.save();
    
    res.json({
      success: true,
      message: 'Inscription au cours réussie'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};
