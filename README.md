# Projeto de API de Alunos

Este projeto é uma API simples para gerenciar alunos. Ele permite cadastrar, listar, detalhar, atualizar e excluir informações de alunos. A API é desenvolvida utilizando Node.js, Express e PostgreSQL, com o uso de Knex.js como query builder.

## Tecnologias utilizadas

- **Node.js**
- **Express**
- **PostgreSQL**
- **Swagger UI**
- **Knex.js**
- **dotenv**

## Requisitos

- Node.js instalado (versão 14.x ou superior)
- PostgreSQL instalado e em execução
- Um arquivo `.env` configurado corretamente com as variáveis de ambiente listadas abaixo

## Configuração do ambiente

1. Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/TechNest-Academy/technest-backend.git
```

2. Instale as dependências do projeto:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis de ambiente:

```bash
PGHOST=localhost
PGUSER=seu_usuario
PGPASSWORD=sua_senha
PGDATABASE=nome_do_banco
PGPORT=5432
PORT=3000
```

4. Certifique-se de que o PostgreSQL está em execução e o banco de dados configurado.

## Rodando a aplicação

1. Para iniciar o servidor, use o comando:

```bash
npm start
```

2. A API estará disponível em `http://localhost:3000`.

3. A documentação da API pode ser acessada em:

```
http://localhost:3000/api-docs
```

## Endpoints

### POST `/cadastrar`
- Cadastra um novo aluno.
- **Campos obrigatórios**: `nome`, `email`, `idade`, `primeiraNota`, `segundaNota`, `professor`, `sala`.

### GET `/listar`
- Lista todos os alunos cadastrados.

### GET `/detalhar/:id`
- Retorna os detalhes de um aluno específico pelo seu `id`.

### PUT `/atualizar/:id`
- Atualiza os dados de um aluno específico pelo seu `id`.

### DELETE `/excluir/:id`
- Exclui um aluno pelo seu `id`.

## Documentação Swagger

A documentação Swagger está disponível na rota `/api-docs` e detalha todos os endpoints da API com exemplos de requisições e respostas.


#### Desenvolvido por:

- [Marcelo Costa](https://github.com/159753marcelo), [Ewerton Bertoldo](https://github.com/EwertonRafael) e [Felipe Macedo](https://github.com/felipemacedo1) 