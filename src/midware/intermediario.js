const knex = require('../database/conexao');

const validarCampos = async (req, res, next) => {
  try {
    const { nome, email, idade, primeiraNota, segundaNota, professor, sala } = req.body;

    if (!nome || nome.length < 3) {
      return res.status(400).json({ mensagem: "Nome é obrigatório e deve ter pelo menos 3 caracteres." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ mensagem: "Email é obrigatório e deve ser um email válido." });
    }

    const emailExistente = await knex("alunos").where("email", email).first();
    if (emailExistente) {
      return res.status(400).json({ mensagem: "Email já está cadastrado." });
    }

    if (!idade || idade <= 0) {
      return res.status(400).json({ mensagem: "Idade deve ser um valor positivo." });
    }

    if (primeiraNota < 0 || primeiraNota > 10 || segundaNota < 0 || segundaNota > 10) {
      return res.status(400).json({ mensagem: "As notas devem ser entre 0 e 10." });
    }

    if (!professor || !sala) {
      return res.status(400).json({ mensagem: "Professor e sala são obrigatórios." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor." });
  }
};

const idValido = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ mensagem: 'Informe um ID válido' });
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
}

const listaVazia = async (req, res, next) => {
  try {
    const todosAlunos = await knex("alunos").select("*");
    if (todosAlunos.length === 0) return res.status(200).json("Lista vazia");
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
}

module.exports = {
  validarCampos,
  idValido,
  listaVazia
};
