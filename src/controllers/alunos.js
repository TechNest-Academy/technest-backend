const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listarAlunos = async (req, res) => {
  try {
    const todosAlunos = await prisma.aluno.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        idade: true,
        notaPrimeiroModulo: true,
        notaSegundoModulo: true,
        media: true,
        turmaId: true,
      },
      orderBy: {
        id: "asc",
      },
    });
    return res.status(200).json(todosAlunos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

const detalharAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(id) },
    });
    if (!aluno) return res.status(404).json({ mensagem: "ID do aluno não encontrado" });
    return res.status(200).json(aluno);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

const cadastrarAluno = async (req, res) => {
  try {
    const { nome, idade, email, notaprimeiromodulo, notasegundomodulo, turmaId } = req.body;
    const turma = await prisma.turma.findUnique({
      where: {
        id: turmaId,
      },
    })
    if(!turma) {
      return res.status(400).json({ mensagem: "ID da turma não encontrado" });
    }
    const media = (notaprimeiromodulo + notasegundomodulo) / 2;
    const alunoCadastrado = await prisma.aluno.create({
      data: {
        nome,
        idade,
        email,
        notaPrimeiroModulo: notaprimeiromodulo,
        notaSegundoModulo: notasegundomodulo,
        media,
        turmaId,
      },
    });
    return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso!", Aluno: alunoCadastrado });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, email, notaprimeiromodulo, notasegundomodulo, turmaId } = req.body;
    const turma = await prisma.turma.findUnique({
      where: {
        id: Number(turmaId),
      },
    })
    if(!turma) {
      return res.status(400).json({ mensagem: "ID da turma não encontrado" });
    }
    const media = (notaprimeiromodulo + notasegundomodulo) / 2;
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: Number(id) },
      data: {
        nome,
        idade,
        email,
        notaPrimeiroModulo: notaprimeiromodulo,
        notaSegundoModulo: notasegundomodulo,
        media,
        turmaId,
      },
    });
    return res.status(200).json({ mensagem: "Aluno atualizado com sucesso", Aluno: alunoAtualizado });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ mensagem: "ID do aluno não encontrado" });
    }
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.aluno.delete({
      where: { id: Number(id) },
    });
    return res.status(204).json();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ mensagem: "ID do aluno não encontrado" });
    }
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};

module.exports = {
  listarAlunos,
  detalharAluno,
  cadastrarAluno,
  atualizarAluno,
  deletarAluno
}