// src/config/chatbotConfig.js
import { Client } from 'whatsapp-web.js';

const client = new Client();

client.on('ready', () => {
    console.log('WhatsApp conectado!');
});

client.initialize();

export default client;
