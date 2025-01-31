import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes.js'

import connectDB from './utils/db.js'

//Variaveis de ambiente
dotenv.config()

//configuração do banco
connectDB()

//iniciando o app
const app = express()

//middlewares
app.use(bodyParser.json())

//Rotas

app.use('/api/users', userRoutes);

//Porta do servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})