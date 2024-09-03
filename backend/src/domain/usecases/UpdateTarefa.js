const TarefaRepository = require('../../infrastructure/repositories/TarefaRepository');

class UpdateTarefa {
    constructor() {
        this.tarefaRepository = new TarefaRepository();
    }

    async execute(cod, tarefaData) {
        const tarefaAtualizada = await this.tarefaRepository.updateTarefa(cod, tarefaData);
        return tarefaAtualizada;
    }
}

module.exports = UpdateTarefa;