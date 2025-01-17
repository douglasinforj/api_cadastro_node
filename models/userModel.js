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

//Middleware para hash da senha antes de salvar
userSchema.pre('save', async function (text){
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password =await bcrypt.hash(this.password, salt);
        next();
    }catch(error) {
        next(error);
    }
});

// Método para comparar senha

useSchema.method.comparePassword = async function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
};

//Exportar modelo
const User = mongoose.model('User', userSchema);
export default User;