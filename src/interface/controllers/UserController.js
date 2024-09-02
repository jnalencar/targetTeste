const UserService = require('../../application/services/UserService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async register(req, res) {
        const { username, password } = req.body;
        try {
            const newUser = await this.userService.registerUser(username, password);
            res.status(201).json({ message: 'Usuário registrado com sucesso', user: newUser });
        } catch (err) {
            res.status(400).json({ error: 'Erro ao registrar usuário' });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const { user, token } = await this.userService.authenticateUser(username, password);
            res.json({ token });
        } catch (err) {
            res.status(401).json({ error: 'Erro ao fazer login' });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userService.getAllUsers();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar usuários' });
        }
    }

    async updateUserPassword(req, res) {
        const { newPassword } = req.body;
        try {
            await this.userService.updateUserPassword(req.userId, newPassword);
            res.json({ message: 'Senha atualizada com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar senha' });
        }
    }

    async updateUserLevel(req, res) {
        const { level } = req.body;
        try {
            await this.userService.updateUserLevel(req.params.id, level);
            res.json({ message: 'Nível do usuário atualizado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao atualizar nível do usuário' });
        }
    }

    async deleteUser(req, res) {
        try {
            await this.userService.deleteUser(req.params.id);
            res.json({ message: 'Usuário deletado com sucesso' });
        } catch (err) {
            res.status(500).json({ error: 'Erro ao deletar usuário' });
        }
    }
}

module.exports = UserController;