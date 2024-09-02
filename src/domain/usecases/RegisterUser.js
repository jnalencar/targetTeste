const bcrypt = require('bcrypt');
const UserRepository = require('../../infrastructure/repositories/UserRepository');

class RegisterUser {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async execute(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRepository.createUser({ username, password: hashedPassword });
        return newUser;
    }
}

module.exports = RegisterUser;