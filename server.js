require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./Config/db'); // Garante a inicialização do banco

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS como motor de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Middlewares essenciais
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Public')));

// Configuração de Sessão
app.use(session({
    secret: secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 dia
}));

// IMPORTANTE: Conecta o gerenciador de rotas unificado
const routes = require('./Routes/index');
app.use('/', routes);

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});