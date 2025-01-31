import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js"
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';


const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,  // Se desejar, pode deixar como false para ver o navegador
    }
});
  
  // Quando o cliente estiver pronto, exibe uma mensagem de confirmação
client.on('ready', () => {
    console.log('Cliente do WhatsApp pronto!');
});
  
  // Quando o cliente precisar gerar o QR Code para conexão
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true }); // Gera o QR Code no terminal
});
  
  // Inicia o cliente
client.initialize();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRoutes)

app.listen(3000, () => {
    console.log('Servidor Rodando em http://localhost:3000')
})

