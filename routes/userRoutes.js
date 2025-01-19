import express from 'express';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';
import { registerUser, loginUser, getUsers, updateUser, deleteUser } from '../controllers/userController.js';



//Rotas abertas
router.post('/registerUser', registerUser);
router.post('/login', loginUser);

// Rotas protegidas
router.get('/', authMiddleware, getUsers);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser)

export default router;