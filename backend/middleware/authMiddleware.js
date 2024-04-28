const jwt = require('jsonwebtoken')

const middleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization.split(" ")[1];
        if (!token) return res.status(403).send("Access denied.");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
}

module.exports = {middleware};