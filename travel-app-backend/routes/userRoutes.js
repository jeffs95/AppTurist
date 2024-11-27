// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/update/password', userController.updatePassword);
router.get('/:idUsuario', userController.getUserData);

module.exports = router;
