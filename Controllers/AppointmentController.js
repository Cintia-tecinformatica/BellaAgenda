const db = require('../Config/db');

class AppointmentController {
    // Busca os agendamentos do usuário logado e renderiza a Dashboard
    renderDashboard(req, res) {
        const userId = req.session.user.id;
        const sql = `SELECT * FROM appointments WHERE user_id = ? ORDER BY data ASC, horario ASC`;

        db.all(sql, [userId], (err, appointments) => {
            if (err) {
                console.error(err.message);
                return res.send('Erro ao carregar seus agendamentos.');
            }
            // Passa os dados do usuário e a lista de agendamentos para a tela
            res.render('dashboard', { 
                user: req.session.user, 
                appointments: appointments 
            });
        });
    }

    // Cria um novo agendamento ligado ao usuário logado
    criar(req, res) {
        const userId = req.session.user.id;
        const { servico, data, horario } = req.body;

        const sql = `INSERT INTO appointments (user_id, servico, data, horario) VALUES (?, ?, ?, ?)`;

        db.run(sql, [userId, servico, data, horario], (err) => {
            if (err) {
                console.error(err.message);
                return res.send('Erro ao salvar o agendamento.');
            }
            res.redirect('/dashboard');
        });
    }

    // Exclui um agendamento do banco
    excluir(req, res) {
        const id = req.params.id;
        const sql = `DELETE FROM appointments WHERE id = ?`;

        db.run(sql, [id], (err) => {
            if (err) {
                console.error(err.message);
                return res.send('Erro ao excluir o agendamento.');
            }
            res.redirect('/dashboard');
        });
    }
}

module.exports = new AppointmentController();