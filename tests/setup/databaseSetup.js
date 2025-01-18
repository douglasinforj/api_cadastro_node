import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test'});

export const setupDatabase = async () => {
    const MONGO_URI_TEST = process.env.MONGO_URI_TEST;

    if (!MONGO_URI_TEST) {
        throw new Error('MONGO_URI_TEST não esta definida. Verifique seu arquivo .env.test')
    }
    try{
     await mongoose.connect(MONGO_URI_TEST);
     console.log('Banco de dados teste conectado com sucesso!');   
    }catch (error) {
        console.error('Erro ao conectar ao banco de dados de teste:', error);
        process.exit(1)
    }
};

//limpeza dos dados testes
export const teardwnDatabase = async () => {
    try{
        await mongoose.connection.dropDatabase();
        console.log('Banco de dados de teste limpo.')
    }catch(error){
        console.error('Erro ao limpar o banco de dados:', error);
    }finally{
        try{
            await mongoose.connection.close();
            console.log('Conexão com o banco de dados encerrada')
        } catch(error){
            console.error('Erro ao encerrar a conexão com o banco de dados:', error)
        }
    }
}