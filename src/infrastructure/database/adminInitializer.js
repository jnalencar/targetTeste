const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../../domain/entities/User'); 

const AdminInitializer = async () => {
    try {
        const adminUser = await User.findOne({ username: 'admin' });
        if (!adminUser) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            const newUser = new User({
                username: 'admin',
                password: hashedPassword,
                level: 3
            });
            await newUser.save();
            console.log('Usuário admin criado com sucesso');
        } else {
            console.log('Usuário admin já existe');
        }
    } catch (error) {
        console.error('Erro ao inicializar o usuário admin:', error);
    }
};

module.exports = AdminInitializer;