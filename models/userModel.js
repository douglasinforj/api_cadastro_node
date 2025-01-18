import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


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
useSchema.pre('save', async function (text){
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
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
const User = mongoose.model('User', useSchema);
export default User;