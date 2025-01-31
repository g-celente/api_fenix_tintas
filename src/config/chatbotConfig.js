// src/config/chatbotConfig.js
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

export default client;
