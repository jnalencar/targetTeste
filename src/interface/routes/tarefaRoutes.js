const express = require('express');
const TarefaController = require('../controllers/TarefaController');

const router = express.Router();
const tarefaController = new TarefaController();

router.post('/tarefa', (req, res) => tarefaController.createTarefa(req, res));
router.get('/tarefa/:cod', (req, res) => tarefaController.getTarefaByCod(req, res));
router.get('/tarefa', (req, res) => tarefaController.getAllTarefas(req, res));
router.put('/tarefa/:cod', (req, res) => tarefaController.updateTarefa(req, res));
router.put('/tarefa/:cod/status', (req, res) => tarefaController.updateTarefaStatus(req, res));
router.delete('/tarefa/:cod', (req, res) => tarefaController.deleteTarefa(req, res));

module.exports = router;