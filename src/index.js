require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const server = express();
server.use(express.json());
server.use(cors());

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

// Conexão com o banco de dados
const mongoURL = 'mongodb://localhost:27017/tarefas?authSource=admin';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

server.post('/register', async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao registrar usuário' });
    }
});

server.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha inválida' });
        }
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao fazer login' });
    }
});

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

server.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'Acesso permitido' });
});

// Servir a página de login
server.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Servir a página de CRUD de tarefas
server.get('/crudtarefas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'crudtarefas.html'));
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

// Rota para registrar um novo usuário
server.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao registrar usuário' });
    }
});

// Rota para login de usuário
server.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha inválida' });
        }
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: 'Erro ao fazer login' });
    }
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});