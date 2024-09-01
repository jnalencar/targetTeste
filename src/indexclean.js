const express = require('express');
const cors = require('cors');
const mongoose = require('./infrastructure/database/mongoose');
const tarefaRoutes = require('./interfaces/routes/tarefaRoutes');

const server = express();
server.use(express.json());
server.use(cors());

// Conectar ao banco de dados
const connect = require('./infrastructure/database/mongoose');

connect();

// Configurar rotas
server.use('/tarefas', tarefaRoutes);

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});