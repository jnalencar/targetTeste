const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();
const userController = new UserController();

router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/users', (req, res) => userController.getAllUsers(req, res));
router.put('/users/password', (req, res) => userController.updateUserPassword(req, res));
router.put('/users/:id/level', (req, res) => userController.updateUserLevel(req, res));
router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router;