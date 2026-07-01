const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Telas (GET)
router.get('/login', AuthController.renderLogin);
router.get('/cadastro', AuthController.renderCadastro);

// Ações dos formulários (POST)
router.post('/cadastro', AuthController.cadastrar);
router.post('/login', AuthController.login);

// Logout (GET)
router.get('/logout', AuthController.logout);

module.exports = router;