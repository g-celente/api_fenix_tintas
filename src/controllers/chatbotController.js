// src/controllers/chatbotController.js
import client from "../config/chatbotConfig.js";

// Função para processar a mensagem quando o client estiver pronto
export const processMessages = () => {
    client.on('message', async (msg) => {
        if (msg.body.match(/menu/i)) {
            await client.sendMessage(msg.from, 'Olá, você conseguiu!');
        }
    });
};
