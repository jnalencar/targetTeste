const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const server = express();
server.use(express.json());
server.use(cors());

// Conexão com o banco de dados
mongoose.connect('mongodb://localhost:27017/tarefas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Model de tarefas
const tarefaSchema = new mongoose.Schema({
    cod: {type: Number, unique:true},
    titulo: String,
    descricao: String,
    status: String,
    dataCriacao: { type: Date, default: Date.now }
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

// Model de contadores
const counterSchema = new mongoose.Schema({
    _id: String,
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Função para obter o próximo valor da sequência
async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findByIdAndUpdate(
        sequenceName,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.seq;
}

// Retorna uma tarefa
server.get('/tarefa/:cod', async (req, res) => {
    try {
        const tarefa = await Tarefa.findOne({ cod: req.params.cod });
        if (!tarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        return res.json(tarefa);
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao buscar tarefa' });
    }
});

// Retorna todas as tarefas
server.get('/tarefa', async (req, res) => {
    try {
        const tarefas = await Tarefa.find();
        return res.json(tarefas);
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao buscar tarefas' });
    }
});

// Adiciona uma tarefa
server.post('/tarefa', async (req, res) => {
    const { titulo, descricao, status } = req.body;
    const cod = await getNextSequenceValue('tarefaId');
    const novaTarefa = new Tarefa({ cod, titulo, descricao, status });
    try {
        await novaTarefa.save();
        return res.json(novaTarefa);
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao adicionar tarefa' });
    }
});

// Atualiza uma tarefa
server.put('/tarefa/:cod', async (req, res) => {
    const { cod } = req.params;
    const { titulo, descricao, status } = req.body;
    try {
        const tarefa = await Tarefa.findOne({ cod });
        if (!tarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        tarefa.titulo = titulo;
        tarefa.descricao = descricao;
        tarefa.status = status;
        await tarefa.save();
        return res.json(tarefa);
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao atualizar tarefa' });
    }
});

// Atualiza o status de uma tarefa
server.put('/tarefa/:cod/status', async (req, res) => {
    const { cod } = req.params;
    const { status } = req.body;
    try {
        const tarefa = await Tarefa.findOne({ cod });
        if (!tarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        tarefa.status = status;
        await tarefa.save();
        return res.json(tarefa);
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao atualizar status da tarefa' });
    }
});

// Remove uma tarefa
server.delete('/tarefa/:cod', async (req, res) => {
    console.log("entrou");
    const { cod } = req.params;
    try {
        const tarefa = await Tarefa.findOneAndDelete({ cod });
        if (!tarefa) {
            return res.status(404).json({ error: 'Tarefa não encontrada' });
        }
        return res.send();
    } catch (err) {
        return res.status(400).json({ error: 'Erro ao deletar tarefa' });
    }
});


server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});