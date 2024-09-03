const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    cod: { type: Number, unique: true },
    titulo: String,
    descricao: String,
    status: String,
    dataCriacao: { type: Date, default: Date.now }
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;