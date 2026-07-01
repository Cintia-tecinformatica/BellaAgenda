const db = require('../Config/db');
const bcrypt = require('bcrypt');

class AuthController {
    // Exibe a tela de login
    renderLogin(req, res) {
        if (req.session.user) return res.redirect('/dashboard');
        res.render('login');
    }

    // Exibe a tela de cadastro
    renderCadastro(req, res) {
        if (req.session.user) return res.redirect('/dashboard');
        res.render('cadastro');
    }

    // Processa o formulário de cadastro
    async cadastrar(req, res) {
        const { nome, email, senha } = req.body;

        // Criptografa a senha (10 rounds de salt)
        const saltRounds = 10;
        const hashSenha = await bcrypt.hash(senha, saltRounds);

        const sql = `INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)`;
        
        db.run(sql, [nome, email, hashSenha], function(err) {
            if (err) {
                console.error(err.message);
                // Se o e-mail já existir (regra UNIQUE do banco)
                return res.send('Erro ao cadastrar. Talvez este e-mail já esteja em uso.');
            }
            // Cadastro deu certo, manda para o login
            res.redirect('/auth/login');
        });
    }

    // Processa o formulário de login
    login(req, res) {
        const { email, senha } = req.body;

        const sql = `SELECT * FROM users WHERE email = ?`;
        
        db.get(sql, [email], async (err, user) => {
            if (err) {
                console.error(err.message);
                return res.send('Erro interno no servidor.');
            }

            // Se o usuário existir e a senha bater com o hash criptografado
            if (user && await bcrypt.compare(senha, user.senha)) {
                // Salva o usuário na sessão (escondendo a senha por segurança)
                req.session.user = { id: user.id, nome: user.nome, email: user.email };
                return res.redirect('/dashboard');
            }

            // Se falhar
            res.send('E-mail ou senha incorretos.');
        });
    }

    // Processa o encerramento da sessão
    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/auth/login');
        });
    }
}

module.exports = new AuthController();