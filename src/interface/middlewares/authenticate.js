const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token recebido:', token); // Adiciona log para depuração

    try {
        const decoded = jwt.verify(token, jwtSecret);
        console.log('Token decodificado:', decoded); // Adiciona log para depuração
        req.userId = decoded.userId;
        req.userLevel = decoded.level;
        next();
    } catch (err) {
        console.error('Erro ao verificar o token:', err);
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = authenticate;