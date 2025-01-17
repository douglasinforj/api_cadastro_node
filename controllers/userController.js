import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//Gera token JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

//Registro de usuário
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Usuário já existe!' });

        const user = await User.create({ name, email, password });
        res.status(201).json({
            id: user_id,
            name: user.name,
            email: user.email,
            token: generateToken(user_id),
        });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error});
    }
};

