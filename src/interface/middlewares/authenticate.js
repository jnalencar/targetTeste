const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        req.userLevel = decoded.level;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = authenticate;