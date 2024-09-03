const express = require('express');
const UserController = require('../controllers/UserController');
const authenticate = require('../middlewares/authenticate');
const authorizeLevel3 = require('../middlewares/authorizeLevel3');

const router = express.Router();
const userController = new UserController();

router.post('/register', (req, res) => userController.register(req, res));
router.post('/login', (req, res) => userController.login(req, res));
router.get('/users', authenticate, authorizeLevel3, (req, res) => userController.getAllUsers(req, res));
router.put('/users/password', authenticate, (req, res) => userController.updateUserPassword(req, res));
router.put('/users/:id/level', authenticate, authorizeLevel3, (req, res) => userController.updateUserLevel(req, res));
router.delete('/users/:id', authenticate, authorizeLevel3, (req, res) => userController.deleteUser(req, res));

module.exports = router;