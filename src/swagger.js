const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routers/rotas.js'];

swaggerAutogen(outputFile, endpointsFiles)
  .then(() => {
    require('./index.js');
  })
  .catch((err) => {
    console.error("Erro ao gerar a documentação do Swagger:", err);
  });
