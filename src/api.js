// src/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Para obter __dirname com ESM
import { dirname } from 'path'; // Para obter __dirname com ESM
import chatbotRoutes from './routes/chatbotRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { Client } from 'whatsapp-web.js';
import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

const client = new Client({
    puppeteer: {
        args: chrome.args,
        executablePath: process.env.CHROME_EXECUTABLE_PATH || chrome.executablePath,
        headless: chrome.headless,
    }
});

client.on('ready', () => {
    console.log('WhatsApp conectado!');
});

// Inicialize o cliente, mas sem assinar eventos diretamente aqui
client.initialize();

const app = express();

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
