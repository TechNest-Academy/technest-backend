const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listarTurmas = async (req, res) => {
  try {
    const todasTurmas = await prisma.turma.findMany({
      include: {
        alunos: false,
      },
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
      include: { alunos: true },
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
        instrutor,
      },
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
        instrutor,
      },
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
      where: { id: Number(id) },
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

const adicionarAlunoATurma = async (req, res) => {
  try {
    const { turmaId, alunoId } = req.body;

    const alunoAtualizado = await prisma.aluno.update({
      where: { id: Number(alunoId) },
      data: { turmaId: Number(turmaId) },
    });

    return res.status(200).json({ mensagem: "Aluno adicionado à turma com sucesso", aluno: alunoAtualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao adicionar aluno à turma" });
  }
};

const removerAlunoDaTurma = async (req, res) => {
  try {
    const { alunoId } = req.body;

    const alunoAtualizado = await prisma.aluno.update({
      where: { id: Number(alunoId) },
      data: { turmaId: null }, // Remove o aluno da turma
    });

    return res.status(200).json({ mensagem: "Aluno removido da turma com sucesso", aluno: alunoAtualizado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao remover aluno da turma" });
  }
};

module.exports = {
  listarTurmas,
  detalharTurma,
  cadastrarTurma,
  atualizarTurma,
  deletarTurma,
  adicionarAlunoATurma,
  removerAlunoDaTurma,
};
