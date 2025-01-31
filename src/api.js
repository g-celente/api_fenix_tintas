import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js"
import { Client } from "whatsapp-web.js"
import qrcode from "qrcode-terminal"

const client = new Client();
const delay = ms => new Promise(res => setTimeout(res, ms))

client.on('qr', qr => {
    qrcode.generate(qr, { small:true })
})

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

client.on('message', async msg => {
    if (msg.body.match(/menu/i)) {
        await client.sendMessage(msg.from, 'Olá')
    }
})


const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRoutes)

app.listen(3000, () => {
    console.log('Servidor Rodando em http://localhost:3000')
})

