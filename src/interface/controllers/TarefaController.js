const TarefaService = require('../../application/services/TarefaService');

class TarefaController {
    constructor() {
        this.tarefaService = new TarefaService();
    }

    async createTarefa(req, res) {
        const { titulo, descricao, status } = req.body;
        try {
            const novaTarefa = await this.tarefaService.createTarefa(titulo, descricao, status);
            res.json(novaTarefa);
        } catch (err) {
            res.status(400).json({ error: 'Erro ao adicionar tarefa' });
        }
    }

    async getTarefaByCod(req, res) {
        try {
            const tarefa = await this.tarefaService.getTarefaByCod(req.params.cod);
            if (!tarefa) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }
            res.json(tarefa);
        } catch (err) {
            res.status(400).json({ error: 'Erro ao buscar tarefa' });
        }
    }

    async getAllTarefas(req, res) {
        try {
            const tarefas = await this.tarefaService.getAllTarefas();
            res.json(tarefas);
        } catch (err) {
            res.status(400).json({ error: 'Erro ao buscar tarefas' });
        }
    }

    async updateTarefa(req, res) {
        const { cod } = req.params;
        const { titulo, descricao, status } = req.body;
        try {
            const tarefa = await this.tarefaService.updateTarefa(cod, titulo, descricao, status);
            if (!tarefa) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }
            res.json(tarefa);
        } catch (err) {
            res.status(400).json({ error: 'Erro ao atualizar tarefa' });
        }
    }

    async deleteTarefa(req, res) {
        const { cod } = req.params;
        try {
            const tarefa = await this.tarefaService.deleteTarefa(cod);
            if (!tarefa) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }
            res.send();
        } catch (err) {
            res.status(400).json({ error: 'Erro ao deletar tarefa' });
        }
    }

    async updateTarefaStatus(req, res) {
        const { cod } = req.params;
        const { status } = req.body;
        try {
            const tarefa = await this.tarefaService.updateTarefaStatus(cod, status);
            if (!tarefa) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }
            res.json(tarefa);
        } catch (err) {
            res.status(400).json({ error: 'Erro ao atualizar status da tarefa' });
        }
    }
}

module.exports = TarefaController;