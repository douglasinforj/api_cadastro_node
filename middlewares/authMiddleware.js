import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Acesso negado!'})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido!' });
    }
};


export default authMiddleware;