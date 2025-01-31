import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//Gera token JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Registro de usuário
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'Usuário já existe!' });

        const user = await User.create({ name, email, password });
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};


// Login de usuário
export const loginUser = async (req, res) => {
    const { email, password} = req.body;

    try{
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ massage: 'Senha invalida!'});

            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user_id),
            })

    }catch (error){
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};

//Listar usuários
export const getUsers  = async (req, res ) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    }catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error});
    }
};

//Atualizar usuário
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { name, email }, {new:true });
        if (!user) return res.status(404).json({ message: 'usuário não encontrado'});

        res.json(user);

    }catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error});
    }
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado!' });

        res.json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
};

