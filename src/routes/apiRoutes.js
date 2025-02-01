// src/routes/apiRoutes.js
import express from 'express';
import authController from "../controllers/auth/authController.js"

const apiRouter = express.Router();

// Rota da API para obter o status do WhatsApp
apiRouter.get('', (req, res) => {
    return res.json({ ok: true})
});

apiRouter.post('/login', authController.signIn)

apiRouter.post('/register', authController.signUp)

// Rota para enviar uma mensagem

export default apiRouter;
