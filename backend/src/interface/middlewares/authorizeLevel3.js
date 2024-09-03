const authorizeLevel3 = (req, res, next) => {
    if (req.userLevel !== 3) {
        return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
};

module.exports = authorizeLevel3;