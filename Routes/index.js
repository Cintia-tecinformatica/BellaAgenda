const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const appointmentRoutes = require('./appointments');
const AppointmentController = require('../controllers/AppointmentController');
const authMiddleware = require('../Middleware/auth');

// Rota Raiz: Se acessar "/", manda direto para o Login
router.get('/', (req, res) => {
    res.redirect('/auth/login');
});

// Rota da Dashboard (Protegida pelo middleware)
router.get('/dashboard', authMiddleware, AppointmentController.renderDashboard);

// Vincula os outros arquivos de rotas com prefixos simples
router.use('/auth', authRoutes);
router.use('/appointments', appointmentRoutes);

module.exports = router;