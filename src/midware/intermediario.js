const knex = require('../database/conexao');

const validarCampos = async (req, res, next) => {
  try {
    const { nome, idade, nota1, nota2, professor, sala } = req.body;
    if (!nome || !idade || !nota1 || !nota2 || !professor || !sala) {
      return res.status(404).json({ mensagem: "Todos os campos devem ser preenchidos." });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno." });
  }
}

const idValido = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ mensagem: 'Informe um ID válido' });
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno." });
  }
}

const listaVazia = async (req, res, next) => {
  try {
    const todosAlunos = await knex("alunos").select("*");
    if (todosAlunos.length === 0) return res.status(200).json("Lista vazia");
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno." });
  }
}

module.exports = {
  validarCampos,
  idValido,
  listaVazia
};