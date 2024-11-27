// routes/sitioRoutes.js
const express = require('express');
const router = express.Router();
const sitioController = require('../controllers/sitioController');

router.post('/sitios', sitioController.createSitio);
router.get('/sitios', sitioController.getAllSitios);
router.get('/sitios/:id', sitioController.getSitioById);
router.put('/sitios/:id', sitioController.updateSitio);
router.delete('/sitios/:id', sitioController.deleteSitio);

module.exports = router;
