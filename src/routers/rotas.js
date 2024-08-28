const express = require('express');
const rotas = express();

const {cadastrarAluno, listarAlunos, detalharAluno, atualizarAluno, deletarAluno} = require("../controllers/alunos");

rotas.post("/cadastrar", cadastrarAluno);
rotas.get("/listar", listarAlunos);
rotas.get("/detalhar/:id", detalharAluno);
rotas.post("/atualizar/:id", atualizarAluno);
rotas.delete("/excluir/:id", deletarAluno);

module.exports = rotas;