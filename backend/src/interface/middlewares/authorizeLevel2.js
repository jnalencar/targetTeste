const authorizeLevel2 = (req, res, next) => {
    if (req.userLevel < 2) {
        return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
};

module.exports = authorizeLevel2;