// src/routes/chatbotRoutes.js
import express from 'express';
import qrcode from 'qrcode';
import client from "../config/chatbotConfig.js";
import { processMessages } from "../controllers/chatbotController.js";

const chatRouter = express.Router();

// Variável para garantir que o QR code só seja enviado uma vez
let qrSent = false;

// Rota que renderiza o HTML com o QR code
chatRouter.get('/qr', (req, res) => {
    // Se o QR Code já foi enviado, não faça nada
    if (qrSent) {
        return;
    }

    client.on('qr', async (qr) => {
        try {
            // Gerar QR Code como base64
            const qrImage = await qrcode.toDataURL(qr);

            // Renderizar o template EJS, passando o QR code gerado
            res.render('qrPage', { qrCode: qrImage });

            // Marcar como enviado para não enviar novamente
            qrSent = true;
        } catch (error) {
            res.status(500).json({ error: 'Falha ao gerar o QR Code' });
        }
    });
});

// Garantir que o client esteja pronto antes de processar as mensagens
client.on('ready', () => {
    processMessages();  // Chama a função para começar a escutar as mensagens
});

export default chatRouter;
