require('dotenv').config();
const express = require('express');
const rotas = require('./routers/rotas');
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(rotas);

app.listen(port,() => {
  console.log(`Rodando na url: http://localhost:${port}`);
})