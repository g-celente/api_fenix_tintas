// src/controllers/chatbotController.js
import { clientPromisse } from "../config/chatbotConfig.js";

const client = await clientPromisse
// Função para processar a mensagem quando o client estiver pronto
export const processMessages = () => {
    client.on('message', async (msg) => {
        if (msg.body.match(/menu/i)) {
            await client.sendMessage(msg.from, 'Olá, você conseguiu!');
        }
    });
};
