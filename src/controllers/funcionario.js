const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const listarFuncionario = async (req, res) => {
  try {
    const todosFuncionario = await prisma.funcionario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        cargo: true
      },
      orderBy: {
        id: "asc",
      },
    })
    return res.status(200).json(todosFuncionario)
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
}

const detalharFuncionario = async (req, res) => {
  try {
    const { id } = req.params
    const Funcionario = await prisma.funcionario.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        nome: true,
        email: true,
        cargo: true
      }
    });
    if (!Funcionario) return res.status(404).json({ mensagem: "ID do Funcionario não encontrado" })
    return res.status(200).json(Funcionario)
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
}
const cadastrarFuncionario = async (req, res) => {
  try {
    const { nome, email, senha, cargo } = req.body
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const FuncionarioCadastrado = await prisma.funcionario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        cargo
      }
    })
    return res.status(201).json({ mensagem: "Funcionario cadastrado com sucesso!", Funcionario: FuncionarioCadastrado });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
}

const loginFuncionario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const funcionario = await prisma.funcionario.findUnique({
      where: {
        email
      }
    });
    if (!funcionario) {
      return res.status(400).json({ mensagem: "Email ou senha inválidos." });
    }
    const senhaCorreta = await bcrypt.compare(senha, funcionario.senha);

    if (!senhaCorreta) {
      return res.status(400).json({ mensagem: "Email ou senha inválidos." });
    }
    const token = jwt.sign({ id: funcionario.id, email: funcionario.email }, process.env.SENHAJWT, { expiresIn: '3h' }
    );
    return res.status(200).json({ funcionario, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
};
const atualizarFuncionario = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, email, cargo } = req.body
    const FuncionarioAtualizado = await prisma.funcionario.update({
      where: { id: Number(id) },
      data: {
        nome,
        email,
        cargo
      }
    })
    if (!FuncionarioAtualizado) return res.status(404).json({ mensagem: "ID do Funcionario não encontrado" })
    return res.status(200).json({ mensagem: "Funcionario atualizado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
}
const deletarFuncionario = async (req, res) => {
  try {
    const { id } = req.params
    const Funcionario = await prisma.funcionario.delete({
      where: { id: Number(id) },
    });
    if (Funcionario === 0) return res.status(404).json({ mensagem: "ID do Funcionario não encontrado" })
    return res.status(204).json()
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor" });
  }
}

module.exports = { listarFuncionario, detalharFuncionario, cadastrarFuncionario, loginFuncionario, atualizarFuncionario, deletarFuncionario }