// src/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Para obter __dirname com ESM
import { dirname } from 'path'; // Para obter __dirname com ESM
import chatbotRoutes from './routes/chatbotRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express();

//Usando para ter acesso a API
app.use(cors())

// Configurar o Express para usar EJS
const __filename = fileURLToPath(import.meta.url); // Obtém o caminho do arquivo atual
const __dirname = dirname(__filename); // Obtém o diretório onde o arquivo está localizado
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Usar __dirname para configurar o caminho das views

// Middleware para express.json() para poder ler o corpo da requisição em JSON
app.use(express.json());

// Usando as rotas para chatbot e API
app.use('/', chatbotRoutes); // Rota para chatbot (QR Code, etc)
app.use('/api', apiRoutes);  // Rota para a API (status, enviar mensagem, etc)


app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
