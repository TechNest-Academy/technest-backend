const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const validarCampos = async (req, res, next) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { nome, idade, email, notaprimeiromodulo, notasegundomodulo } = req.body;
    if (!nome || !idade || !email || notaprimeiromodulo === undefined || notasegundomodulo === undefined) {
      return res.status(400).json({ mensagem: "Todos os campos devem ser preenchidos." });
    }
    if (notaprimeiromodulo < 0 || notaprimeiromodulo > 10 || notasegundomodulo < 0 || notasegundomodulo > 10) {
      return res.status(400).json({ mensagem: 'A nota deve estar entre 0 e 10.' });
    }
    if (idade <= 0) {
      return res.status(400).json({ mensagem: "Idade deve ser um valor positivo." });
    } if (nome.length < 3) {
      return res.status(400).json({ mensagem: "Nome deve ter pelo menos 3 letras." });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ mensagem: "Email inválido." });
    } next();
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
};
const listaVazia = async (req, res, next) => {
  try {
    const todosAlunos = await prisma.aluno.findMany();
    if (todosAlunos.length === 0) return res.status(200).json("Lista vazia");
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};
const emailValidoParaCadastro = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExistente = await prisma.aluno.findUnique({
      where: { email },
    });
    if (emailExistente) return res.status(400).json({ mensagem: 'Email já existente.' });
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};
const emailCadastroFuncionario = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExistente = await prisma.funcionario.findUnique({
      where: { email },
    });
    if (emailExistente) return res.status(400).json({ mensagem: 'Email já existente.' });
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};
const emailValidoParaAtualizacao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const emailExistente = await prisma.aluno.findFirst({
      where: {
        email,
        id: { not: Number(id) },
      },
    });
    if (emailExistente) return res.status(400).json({ mensagem: 'Email já existente.' });
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};
const emailValidoAtualizacaoFuncionario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const emailExistente = await prisma.funcionario.findFirst({
      where: {
        email,
        id: { not: Number(id) },
      },
    });
    if (emailExistente) return res.status(400).json({ mensagem: 'Email já existente.' });
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno." });
  }
};
const campoFuncionarios = async (req, res, next) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { nome, email, senha, cargo } = req.body;
    if (!nome || !email || !senha || !cargo) {
      return res.status(400).json({ mensagem: "Todos os campos devem ser preenchidos." });
    }
    if (nome.length < 3) {
      return res.status(400).json({ mensagem: "Nome deve ter pelo menos 3 letras." });
    }
    if (senha.length < 6) {
      return res.status(400).json({ mensagem: "Senha deve ter pelo menos 6 letras." });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ mensagem: "Email inválido." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno de servidor." });
  }
}
const verificaLogin = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ mensagem: "Usuário não autorizado." });
  };
  const token = authorization.split(' ')[1];
  try {
    const { id } = jwt.verify(token, process.env.SENHAJWT);
    const { email } = await prisma.funcionario.findUnique({ where: { id } })
    req.email = email
    req.id = id
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }
};

module.exports = {
  validarCampos,
  idValido,
  listaVazia,
  emailValidoParaCadastro,
  emailValidoParaAtualizacao,
  emailCadastroFuncionario,
  emailValidoAtualizacaoFuncionario,
  campoFuncionarios,
  verificaLogin
};
