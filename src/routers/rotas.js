const express = require('express');
const rotas = express();

const { validarCampos, idValido, listaVazia, emailValidoParaCadastro, emailValidoParaAtualizacao } = require('../midware/intermediario');
const { cadastrarAluno, listarAlunos, detalharAluno, atualizarAluno, deletarAluno } = require("../controllers/alunos");

rotas.post("aluno/cadastrar", validarCampos, emailValidoParaCadastro, cadastrarAluno);
rotas.get("aluno/listar", listaVazia, listarAlunos);
rotas.get("aluno/detalhar/:id", idValido, detalharAluno);
rotas.put("aluno/atualizar/:id", validarCampos, idValido, emailValidoParaAtualizacao, atualizarAluno);
rotas.delete("aluno/excluir/:id", idValido, deletarAluno);

const { listarTurmas, detalharTurma, cadastrarTurma, atualizarTurma, deletarTurma } = require("../controllers/turma");

rotas.get("/turma", listarTurmas);
rotas.get("/turma/:id", detalharTurma);
rotas.post("/turma", cadastrarTurma);
rotas.put("/turma/:id", atualizarTurma);
rotas.delete("/turma/:id", deletarTurma);

module.exports = rotas;