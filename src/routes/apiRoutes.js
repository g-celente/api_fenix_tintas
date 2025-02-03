// src/routes/apiRoutes.js
import express from 'express';
import authController from "../controllers/auth/authController.js"
import admController from '../controllers/admin/admController.js';
import verifyJwt from "../middlewares/verifyToken.js"

const apiRouter = express.Router();

// Rota da API para obter o status do WhatsApp
apiRouter.get('', (req, res) => {
    return res.json({ ok: true})
});

apiRouter.post('/login', authController.signIn)

apiRouter.post('/register', authController.signUp)

apiRouter.get('/getClients', verifyJwt, admController.getBudgets)
apiRouter.post('/getClient', verifyJwt, admController.getClientById)
apiRouter.get('/getClientStatus', verifyJwt, admController.getClientStatus)

// Rota para enviar uma mensagem

export default apiRouter;
