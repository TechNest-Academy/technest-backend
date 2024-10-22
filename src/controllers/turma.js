const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listarTurmas = async (req, res) => {
  try {
    const todasTurmas = await prisma.turma.findMany({
      include: { alunos: false } // não lista os alunos da turma na resposta
    });
    return res.status(200).json(todasTurmas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

const detalharTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const turma = await prisma.turma.findUnique({
      where: { id: Number(id) },
      include: { alunos: true } // lista os alunos da turma na resposta
    });
    if (!turma) return res.status(400).json({ mensagem: "ID da turma não encontrado" });
    return res.status(200).json(turma);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

const cadastrarTurma = async (req, res) => {
  try {
    const { nome, instrutor } = req.body;

    const turmaCadastrada = await prisma.turma.create({
      data: {
        nome,
        instrutor
      }
    });

    return res.status(201).json({ mensagem: "Turma cadastrada com sucesso!", Turma: turmaCadastrada });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

const atualizarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, instrutor } = req.body;

    const turmaAtualizada = await prisma.turma.update({
      where: { id: Number(id) },
      data: {
        nome,
        instrutor
      }
    });

    return res.status(200).json({ mensagem: "Turma atualizada com sucesso", Turma: turmaAtualizada });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(400).json({ mensagem: "ID da turma não encontrado" });
    }
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

const deletarTurma = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.turma.delete({
      where: { id: Number(id) }
    });

    return res.status(204).json();
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(400).json({ mensagem: "ID da turma não encontrado" });
    }
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

module.exports = {
  listarTurmas,
  detalharTurma,
  cadastrarTurma,
  atualizarTurma,
  deletarTurma
};
