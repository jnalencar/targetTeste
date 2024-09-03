const express = require('express');
const TarefaController = require('../controllers/TarefaController');
const authenticate = require('../middlewares/authenticate');
const authorizeLevel2 = require('../middlewares/authorizeLevel2');

const router = express.Router();
const tarefaController = new TarefaController();

router.post('/tarefa', authenticate, authorizeLevel2, (req, res) => tarefaController.createTarefa(req, res));
router.get('/tarefa/:cod', authenticate, (req, res) => tarefaController.getTarefaByCod(req, res));
router.get('/tarefa', authenticate, (req, res) => tarefaController.getAllTarefas(req, res));
router.put('/tarefa/:cod', authenticate, authorizeLevel2, (req, res) => tarefaController.updateTarefa(req, res));
router.put('/tarefa/:cod/status', authenticate, authorizeLevel2, (req, res) => tarefaController.updateTarefaStatus(req, res));
router.delete('/tarefa/:cod', authenticate, authorizeLevel2, (req, res) => tarefaController.deleteTarefa(req, res));

module.exports = router;