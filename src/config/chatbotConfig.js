// src/config/chatbotConfig.js
import { Client } from 'whatsapp-web.js';

const client = new Client();

client.on('ready', () => {
    console.log('WhatsApp conectado!');
});

// Inicialize o cliente, mas sem assinar eventos diretamente aqui
client.initialize();

export default client;
