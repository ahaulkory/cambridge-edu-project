const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('multer');
const path = require('path');

// Configuration de multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resources');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.basename(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|doc|docx|jpg|jpeg|png|xlsx|xls/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Format de fichier non supporté'));
    }
  }
});

// Routes publiques
router.get('/courses/:courseId/resources', resourceController.getResources);
router.get('/:id', resourceController.getResource);
router.get('/:id/download', resourceController.downloadResource);

// Routes protégées (administrateurs)
router.post('/courses/:courseId/resources', auth, admin, upload.single('file'), resourceController.uploadResource);
router.delete('/:id', auth, admin, resourceController.deleteResource);

module.exports = router;
