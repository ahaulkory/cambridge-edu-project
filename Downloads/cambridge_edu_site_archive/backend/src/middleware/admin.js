const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    // Vérifier si l'utilisateur est un administrateur
    const user = await User.findById(req.user.id);
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé, privilèges d\'administrateur requis'
      });
    }
    
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};
