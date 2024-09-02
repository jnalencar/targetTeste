require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./infrastructure/database/mongoose');
const userRoutes = require('./interface/routes/userRoutes');
const tarefaRoutes = require('./interface/routes/tarefaRoutes');
const authenticate = require('./interface/middlewares/authenticate');
const authorizeLevel3 = require('./interface/middlewares/authorizeLevel3');

const server = express();
server.use(express.json());
server.use(cors());

connectDB();

server.use('', userRoutes);
server.use('', tarefaRoutes);

// Servir a página de login
server.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Servir a página de CRUD de tarefas
server.get('/crudtarefas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'crudtarefas.html'));
});

// Servir a página de CRUD de usuários (apenas para usuários de nível 3)
server.get('/crudusers.html', authenticate, authorizeLevel3, (req, res) => {
    res.sendFile(path.join(__dirname, 'crudusers.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});