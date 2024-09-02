const User = require('../../domain/entities/User');

class UserRepository {
    async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async findUserByUsername(username) {
        return await User.findOne({ username });
    }

    async findAllUsers() {
        return await User.find({}, 'username level createdAt');
    }

    async updateUserPassword(userId, hashedPassword) {
        return await User.findByIdAndUpdate(userId, { password: hashedPassword });
    }

    async updateUserLevel(userId, level) {
        return await User.findByIdAndUpdate(userId, { level });
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = UserRepository;