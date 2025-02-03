// src/server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Para obter __dirname com ESM
import { dirname } from 'path'; // Para obter __dirname com ESM
import chatbotRoutes from './routes/chatbotRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import dotenv from "dotenv"
import cors from "cors"
import prisma from './models/prisma.js';

dotenv.config()

const app = express();

//Usando para ter acesso a API
app.use(cors())

// Configurar o Express para usar EJS
const __filename = fileURLToPath(import.meta.url); // Obtém o caminho do arquivo atual
const __dirname = dirname(__filename); // Obtém o diretório onde o arquivo está localizado
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Usar __dirname para configurar o caminho das views

// Middleware para express.json() para poder ler o corpo da requisição em JSON
app.use(express.json());

// Usando as rotas para chatbot e API
app.use('/', chatbotRoutes); // Rota para chatbot (QR Code, etc)
app.use('/api', apiRoutes);  // Rota para a API (status, enviar mensagem, etc)

/*
app.post('/populate-clients', async (req, res) => {
    try {
      const numClients = req.body.numClients || 10; // Define o número de clientes, default 10
      const clients = await generateClients(numClients);
      res.status(201).json({
        message: `${numClients} clients generated successfully!`,
        clients,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating clients.' });
    }
  });
*/

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

/*
const generateClients = async (numClients) => {
    const clients = [];
  
    const generateRandomPhone = () => {
      const phoneNumber = `+55 9${Math.floor(Math.random() * 1000000000)}`;
      return phoneNumber;
    };
  
    const generateRandomCep = () => {
      const cep = `1${Math.floor(Math.random() * 10000)}-${Math.floor(Math.random() * 100)}`
      return cep;
    };
  
    const generateRandomCpf = () => {
      const cpf = `${Math.floor(Math.random() * 100000000)}${Math.floor(Math.random() * 1000)}`;
      return cpf;
    };
  
    const generateRandomStreet = () => {
      const streets = ["Rua A", "Rua B", "Avenida X", "Praça Y", "Travessa Z"];
      return streets[Math.floor(Math.random() * streets.length)];
    };
  
    const generateRandomCity = () => {
      const cities = ["Curitiba", "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Fortaleza"];
      return cities[Math.floor(Math.random() * cities.length)];
    };
  
    const generateRandomHouseNumber = () => {
        return `${Math.floor(Math.random() * 1000)}`;  // Convertendo para string
    };
  
    const generateRandomEmail = (name) => {
      const domains = ["gmail.com", "hotmail.com", "yahoo.com"];
      return `${name.toLowerCase().replace(/\s+/g, '.')}@${domains[Math.floor(Math.random() * domains.length)]}`;
    };
  
    const generateRandomName = () => {
      const firstNames = ["Carlos", "Ana", "João", "Maria", "Luiza", "Pedro"];
      const lastNames = ["Silva", "Costa", "Oliveira", "Souza", "Pereira", "Alves"];
      return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    };
  
    for (let i = 0; i < numClients; i++) {
      // Gerar dados fictícios
      const name = generateRandomName();
      const email = generateRandomEmail(name);
      const phone = generateRandomPhone();
      const cep = generateRandomCep();
      const street = generateRandomStreet();
      const city = generateRandomCity();
      const houseNumber = generateRandomHouseNumber();
      const cpf = generateRandomCpf();
  
      // Randomizar status dos clientes
      const isRecommended = Math.random() > 0.5;
      const hasBudget = Math.random() > 0.5;
      const recommender = isRecommended ? generateRandomName() : null;
  
      // Criar cliente no banco de dados
      const client = await prisma.client.create({
        data: {
          name,
          email,
          phone,
          cep,
          street,
          city,
          house_number: houseNumber,
          cpf,
          recommender,
        },
      });
  
      // Se o cliente tiver orçamento
      if (hasBudget) {
        await prisma.budget.create({
          data: {
            clientId: client.id,
            details: "Orçamento solicitado para serviços diversos.",
          },
        });
      }
  
      clients.push(client);
    }
  
    return clients;
  };
  */