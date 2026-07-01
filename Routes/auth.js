const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth');

// Telas (GET)
router.get('/login', authcontroller.renderLogin);
router.get('/cadastro', authController.renderCadastro);

// Ações dos formulários (POST)
router.post('/cadastro', authcontroller.cadastrar);
router.post('/login', authcontroller.login);

// Logout (GET)
router.get('/logout', authcontroller.logout);

module.exports = router;