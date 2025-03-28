const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Routes publiques
router.get('/courses/:courseId/modules', moduleController.getModules);
router.get('/:id', moduleController.getModule);

// Routes protégées (utilisateurs connectés)
router.put('/:id/progress', auth, moduleController.updateProgress);

// Routes protégées (administrateurs)
router.post('/courses/:courseId/modules', auth, admin, moduleController.createModule);
router.put('/:id', auth, admin, moduleController.updateModule);
router.delete('/:id', auth, admin, moduleController.deleteModule);

module.exports = router;
