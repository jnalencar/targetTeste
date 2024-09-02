const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../infrastructure/repositories/UserRepository');

class LoginUser {
    constructor() {
        this.userRepository = new UserRepository();
        this.jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
    }

    async execute(username, password) {
        const user = await this.userRepository.findUserByUsername(username);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Senha inválida');
        }
        const token = jwt.sign({ userId: user._id, level: user.level }, this.jwtSecret, { expiresIn: '1h' });
        return { token };
    }
}

module.exports = LoginUser;