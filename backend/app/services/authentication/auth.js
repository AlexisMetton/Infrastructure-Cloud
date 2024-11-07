const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "phrasesecret";

const authMiddleware = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) {
        return
    }
    
    if (token && token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trim();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
}

module.exports = authMiddleware;