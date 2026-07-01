const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const authMiddleware = require('../Middleware/auth');

// Todas as rotas de agendamentos exigem que o usuário esteja logado
router.post('/novo', authMiddleware, AppointmentController.criar);
router.post('/excluir/:id', authMiddleware, AppointmentController.excluir);

module.exports = router;