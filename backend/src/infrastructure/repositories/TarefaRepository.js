const Tarefa = require('../../domain/entities/Tarefa');

class TarefaRepository {
    async createTarefa(tarefaData) {
        const tarefa = new Tarefa(tarefaData);
        return await tarefa.save();
    }

    async findTarefaByCod(cod) {
        return await Tarefa.findOne({ cod });
    }

    async findAllTarefas() {
        return await Tarefa.find();
    }

    async updateTarefa(cod, updateData) {
        return await Tarefa.findOneAndUpdate({ cod }, updateData, { new: true });
    }

    async updateTarefaStatus(cod, status) {
        return await Tarefa.findOneAndUpdate({ cod }, { status }, { new: true });
    }

    async deleteTarefa(cod) {
        return await Tarefa.findOneAndDelete({ cod });
    }
}

module.exports = TarefaRepository;