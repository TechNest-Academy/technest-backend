const knex = require('../database/conexao');

const listarAlunos = async (req, res) => {
  try {
    const todosAlunos = await knex("alunos").select("*")
    return res.status(200).json(todosAlunos)
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
}

const detalharAluno = async (req, res) => {
  try {
    const { id } = req.params
    const aluno = await knex("alunos").select("*").where("id", id).first()
    if (!aluno) return res.status(404).json({ mensagem: "ID do aluno não encontrado" })
    return res.status(200).json(aluno)
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }

}

const cadastrarAluno = async (req, res) => {
  try {
    const { nome, idade, email, notaprimeiromodulo, notasegundomodulo, media } = req.body
    const alunoCadastrado = await knex("alunos").insert({ nome, idade, email, notaprimeiromodulo, notasegundomodulo, media }).returning("*")
    return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso!", Aluno: alunoCadastrado });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
}

const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, idade, email, notaprimeiromodulo, notasegundomodulo, media } = req.body
    const alunoAtualizado = await knex("alunos").where("id", id).update({ nome, idade, email, notaprimeiromodulo, notasegundomodulo, media })
    if (!alunoAtualizado) return res.status(404).json({ mensagem: "ID do aluno não encontrado" })
    return res.status(200).json({ mensagem: "Aluno atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
}
const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params
    const aluno = await knex("alunos").where("id", id).del();
    if (aluno === 0) return res.status(404).json({ mensagem: "ID do aluno não encontrado" })
    return res.status(204).json()
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
}

module.exports = {
  listarAlunos,
  detalharAluno,
  cadastrarAluno,
  atualizarAluno,
  deletarAluno
}