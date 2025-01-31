import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js"


const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', apiRoutes)

app.listen(3000, () => {
    console.log('Servidor Rodando em http://localhost:3000')
})
