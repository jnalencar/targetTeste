const TarefaRepository = require('../../infrastructure/repositories/TarefaRepository');

class UpdateStatusTarefa {
    constructor() {
        this.tarefaRepository = new TarefaRepository();
    }

    async execute(cod, status) {
        const tarefaAtualizada = await this.tarefaRepository.updateTarefaStatus(cod, status);
        return tarefaAtualizada;
    }
}

module.exports = UpdateStatusTarefa;