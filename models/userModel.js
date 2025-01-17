import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { type } from "os";

//Definindo o schema do usuário
const useSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required:true },
    },
    { timestamps: true}
);

