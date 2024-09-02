const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../../infrastructure/repositories/UserRepository');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async registerUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRepository.createUser({ username, password: hashedPassword });
        return newUser;
    }

    async authenticateUser(username, password) {
        const user = await this.userRepository.findUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id, level: user.level }, jwtSecret, { expiresIn: '1h' });
            return { user, token };
        }
        throw new Error('Invalid username or password');
    }

    async getAllUsers() {
        return await this.userRepository.findAllUsers();
    }

    async updateUserPassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return await this.userRepository.updateUserPassword(userId, hashedPassword);
    }

    async updateUserLevel(userId, level) {
        return await this.userRepository.updateUserLevel(userId, level);
    }

    async deleteUser(userId) {
        return await this.userRepository.deleteUser(userId);
    }
}

module.exports = UserService;