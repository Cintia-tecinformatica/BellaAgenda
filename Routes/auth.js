const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth');

// Telas (GET)
router.get('/login', authController.renderLogin);
router.get('/cadastro', authController.renderCadastro);

// Ações dos formulários (POST)
router.post('/cadastro', authController.cadastrar);
router.post('/login', authController.login);

// Logout (GET)
router.get('/logout', authController.logout);

module.exports = router;