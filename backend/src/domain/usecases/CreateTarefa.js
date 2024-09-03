const TarefaRepository = require('../../infrastructure/repositories/TarefaRepository');

class CreateTarefa {
    constructor() {
        this.tarefaRepository = new TarefaRepository();
    }

    async execute(tarefaData) {
        const novaTarefa = await this.tarefaRepository.createTarefa(tarefaData);
        return novaTarefa;
    }
}

module.exports = CreateTarefa;