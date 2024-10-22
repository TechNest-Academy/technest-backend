const express = require('express');
const rotas = express();

const { validarCampos, idValido, listaVazia, emailValidoParaCadastro, emailValidoParaAtualizacao } = require('../midware/intermediario');
const { cadastrarAluno, listarAlunos, detalharAluno, atualizarAluno, deletarAluno } = require("../controllers/alunos");

rotas.post("/cadastrar", validarCampos, emailValidoParaCadastro, cadastrarAluno);
rotas.get("/listar", listaVazia, listarAlunos);
rotas.get("/detalhar/:id", idValido, detalharAluno);
rotas.put("/atualizar/:id", validarCampos, idValido, emailValidoParaAtualizacao, atualizarAluno);
rotas.delete("/excluir/:id", idValido, deletarAluno);

const { listarTurmas, detalharTurma, cadastrarTurma, atualizarTurma, deletarTurma } = require("../controllers/turma");

rotas.get("/turmas", listarTurmas);
rotas.get("/turma/:id", detalharTurma);
rotas.post("/turma", cadastrarTurma);
rotas.put("/turma/:id", atualizarTurma);
rotas.delete("/turma/:id", deletarTurma);

module.exports = rotas;