// src/routes/apiRoutes.js
import express from 'express';

const apiRouter = express.Router();

// Rota da API para obter o status do WhatsApp
apiRouter.get('', (req, res) => {
    return res.json({ ok: true})
});

// Rota para enviar uma mensagem

export default apiRouter;
