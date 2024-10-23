require('dotenv').config();

const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
const rotas = require('./routers/rotas');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.use(rotas);

app.listen(port,() => {
  console.log(`Rodando na url: http://localhost:${port}/api-docs`);
});