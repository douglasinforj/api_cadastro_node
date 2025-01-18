import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware';
import { register, loginUser, getUsers, updateUser, deleteUser } from '../controllers/userController';
import { deflate } from 'zlib';


//Rotas abertas
router.post('/registerUser');
router.post('/login', loginUser);

// Rotas protegidas
router.get('/', authMiddleware, getUsers);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser)

export default router