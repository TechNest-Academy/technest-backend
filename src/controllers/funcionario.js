const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const listarFuncionario = async (req, res) => {
    try {
      const todosFuncionario = await prisma.funcionario.findMany()
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
      });
      if (!Funcionario) return res.status(404).json({ mensagem: "ID do Funcionario não encontrado" })
      return res.status(200).json(Funcionario)
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno de servidor" });
    }
  
  }

  const cadastrarFuncionario = async (req, res) => {
    try {
      const { nome,email,senha,cargo } = req.body
      const FuncionarioCadastrado = await prisma.funcionario.create({
        data:{
            nome,email,senha, cargo
        }
      })
      return res.status(201).json({ mensagem: "Funcionario cadastrado com sucesso!", Funcionario: FuncionarioCadastrado });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno de servidor" });
    }
  }

  const atualizarFuncionario = async (req, res) => {
    try {
      const { id } = req.params
      const { nome, email,senha,cargo } = req.body
      const FuncionarioAtualizado = await prisma.funcionario.update({
        where:{id:number(id) },
        data:{
            nome,
            email,
            senha,
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

  module.exports= { listarFuncionario, detalharFuncionario,cadastrarFuncionario,atualizarFuncionario,deletarFuncionario }