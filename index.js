const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

const tarefas = [
    { id: 1, titulo: 'Estudar Node.js', descricao: 'Aprender sobre o runtime Node.js', status: 'pendente', dataCriacao: new Date() },
    { id: 2, titulo: 'Estudar React', descricao: 'Aprender sobre a biblioteca React', status: 'pendente', dataCriacao: new Date() },
    { id: 3, titulo: 'Estudar React Native', descricao: 'Aprender sobre o framework React Native', status: 'pendente', dataCriacao: new Date() }
];

// Retorna uma tarefa
server.get('/tarefa/:index', (req, res) => {
    const { index } = req.params;
    return res.json(tarefas[index]);
});

// Retorna todas as tarefas
server.get('/tarefa', (req, res) => {
    return res.json(tarefas);
});

// Adiciona uma tarefa
server.post('/tarefa', (req, res) => {
    const { id, titulo, descricao, status } = req.body;
    const novaTarefa = { id, titulo, descricao, status, dataCriacao: new Date() };
    tarefas.push(novaTarefa);
    return res.json(novaTarefa);
});

// Atualiza uma tarefa
server.put('/tarefa/:index', (req, res) => {
    const { index } = req.params;
    const { id, titulo, descricao, status } = req.body;
    const tarefa = tarefas[index];
    tarefa.id = id;
    tarefa.titulo = titulo;
    tarefa.descricao = descricao;
    tarefa.status = status;
    return res.json(tarefa);
});

// Atualiza o status de uma tarefa
server.put('/tarefa/:index/status', (req, res) => {
    const { index } = req.params;
    const { status } = req.body;
    const tarefa = tarefas[index];
    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    tarefa.status = status;
    return res.json(tarefa);
});

// Remove uma tarefa
server.delete('/tarefa/:index', (req, res) => {
    const { index } = req.params;
    tarefas.splice(index, 1);
    return res.send();
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});