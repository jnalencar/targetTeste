const TarefaRepository = require('../../infrastructure/repositories/TarefaRepository');
const Counter = require('../../domain/entities/Counter');

class TarefaService {
    constructor() {
        this.tarefaRepository = new TarefaRepository();
    }

    async getNextSequenceValue(sequenceName) {
        const sequenceDocument = await Counter.findByIdAndUpdate(
            sequenceName,
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        return sequenceDocument.seq;
    }

    async createTarefa(titulo, descricao, status) {
        const cod = await this.getNextSequenceValue('tarefaId');
        return await this.tarefaRepository.createTarefa({ cod, titulo, descricao, status });
    }

    async getTarefaByCod(cod) {
        return await this.tarefaRepository.findTarefaByCod(cod);
    }

    async getAllTarefas() {
        return await this.tarefaRepository.findAllTarefas();
    }

    async updateTarefa(cod, titulo, descricao, status) {
        return await this.tarefaRepository.updateTarefa(cod, { titulo, descricao, status });
    }

    async deleteTarefa(cod) {
        return await this.tarefaRepository.deleteTarefa(cod);
    }

    async updateTarefaStatus(cod, status) {
        return await this.tarefaRepository.updateTarefaStatus(cod, status);
    }
}

module.exports = TarefaService;