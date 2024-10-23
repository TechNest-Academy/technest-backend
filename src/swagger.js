const swaggerAutogen = require('swagger-autogen')();

// Definindo as informações da API
const doc = {
  info: {
    title: 'Minha API',
    description: 'Documentação da API para Gerenciamento de Alunos e Turmas',
  },
  host: 'localhost:3000', // Altere para o seu host de produção se necessário
  schemes: ['http', 'https'], // Inclua https se seu ambiente de produção suportar
  tags: [
    {
      name: "Alunos",
      description: "Rotas relacionadas ao gerenciamento de alunos"
    },
    {
      name: "Turmas",
      description: "Rotas relacionadas ao gerenciamento de turmas"
    },
  ],
  definitions: {
    Aluno: {
      id: 1,
      nome: "João da Silva",
      email: "joao@email.com",
      idade: 20,
      notaPrimeiroModulo: 8.5,
      notaSegundoModulo: 9.0,
      media: 8.75
    },
    Turma: {
      id: 1,
      nome: "Turma A",
      instrutor: "Instrutor X",
      alunos: [
        {
          id: 1,
          nome: "João da Silva",
          email: "joao@email.com",
          idade: 20
        }
      ]
    }
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routers/rotas.js']; // Defina o arquivo com as suas rotas

// Geração automática da documentação
swaggerAutogen(outputFile, endpointsFiles, doc)
  .then(() => {
    require('./index.js'); // Ou o arquivo principal do seu app
  })
  .catch((err) => {
    console.error("Erro ao gerar a documentação do Swagger:", err);
  });
