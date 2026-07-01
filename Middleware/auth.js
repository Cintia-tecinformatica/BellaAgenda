module.exports = (req, res, next) => {
    // Se existir um usuário na sessão, permite continuar
    if (req.session && req.session.user) {
        return next();
    }
    // Se não estiver logado, redireciona para o login
    res.redirect('/auth/login');
};