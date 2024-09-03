const TarefaRepository = require('../../infrastructure/repositories/TarefaRepository');

class DeleteTarefa {
    constructor() {
        this.tarefaRepository = new TarefaRepository();
    }

    async execute(cod) {
        await this.tarefaRepository.deleteTarefa(cod);
    }
}

module.exports = DeleteTarefa;