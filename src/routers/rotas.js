const express = require('express');
const rotas = express();

const { emailCadastroFuncionario, emailValidoAtualizacaoFuncionario, campoFuncionarios, validarCampos, idValido, listaVazia, emailValidoParaCadastro, emailValidoParaAtualizacao, verificaLogin } = require('../midware/intermediario');
const { cadastrarAluno, listarAlunos, detalharAluno, atualizarAluno, deletarAluno } = require("../controllers/alunos");

const { listarTurmas, detalharTurma, cadastrarTurma, atualizarTurma, deletarTurma, adicionarAlunoATurma, removerAlunoDaTurma } = require("../controllers/turma");

const { loginFuncionario, cadastrarFuncionario, listarFuncionario, detalharFuncionario, atualizarFuncionario, deletarFuncionario } = require("../controllers/funcionario");

rotas.post("/funcionario/", campoFuncionarios, emailCadastroFuncionario, cadastrarFuncionario);
rotas.post("/login", loginFuncionario);

rotas.use(verificaLogin)

rotas.post("/aluno/cadastrar", validarCampos, emailValidoParaCadastro, cadastrarAluno);
rotas.get("/aluno/listar", listaVazia, listarAlunos);
rotas.get("/aluno/detalhar/:id", idValido, detalharAluno);
rotas.put("/aluno/atualizar/:id", validarCampos, idValido, emailValidoParaAtualizacao, atualizarAluno);
rotas.delete("/aluno/excluir/:id", idValido, deletarAluno);

rotas.get("/turma", listarTurmas);
rotas.get("/turma/:id", detalharTurma);
rotas.post("/turma", cadastrarTurma);
rotas.put("/turma/:id", atualizarTurma);
rotas.delete("/turma/:id", deletarTurma);

rotas.post("/turma/adicionar-aluno", adicionarAlunoATurma);
rotas.post("/turma/remover-aluno", removerAlunoDaTurma);

rotas.get("/funcionario/listar", listarFuncionario);
rotas.get("/funcionario/detalhar/:id", idValido, detalharFuncionario);
rotas.put("/funcionario/atualizar/:id", campoFuncionarios, idValido, emailValidoAtualizacaoFuncionario, atualizarFuncionario);
rotas.delete("/funcionario/excluir/:id", idValido, deletarFuncionario);

module.exports = rotas;