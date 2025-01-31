// src/config/chatbotConfig.js
import { Client } from 'whatsapp-web.js';
import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

async function initializeClient() {
    // Aguarde a resolução do caminho do Chromium
    const executablePath = await chrome.executablePath;

    const client = new Client({
        puppeteer: {
            args: chrome.args,
            executablePath, // Caminho resolvido
            headless: chrome.headless,
        }
    });

    client.on('ready', () => {
        console.log('WhatsApp conectado!');
    });

    // Inicialize o cliente
    await client.initialize(); // Espera a inicialização ser concluída antes de prosseguir

    return client;
}

initializeClient().catch(error => {
    console.error('Erro ao inicializar o cliente:', error);
});

export default initializeClient;
