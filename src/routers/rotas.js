const express = require('express');
const rotas = express();

const { cadastrarAluno, listarAlunos, detalharAluno, atualizarAluno, deletarAluno } = require("../controllers/alunos");
const { validarCampos, idValido, listaVazia } = require('../midware/intermediario');

rotas.post("/cadastrar", validarCampos, cadastrarAluno);
rotas.get("/listar", listaVazia, listarAlunos);
rotas.get("/detalhar/:id", idValido, detalharAluno);
rotas.put("/atualizar/:id", idValido, validarCampos, atualizarAluno);
rotas.delete("/excluir/:id", idValido, deletarAluno);

module.exports = rotas;
