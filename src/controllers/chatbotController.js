// src/controllers/chatbotController.js
import client from "../config/chatbotConfig.js";
import chatBotModel from "../models/chatBotModel.js"

// Armazena o estado de cada usuário
let userStates = {}; 
let userResponses = {};

const delay = ms => new Promise(res => setTimeout(res, ms));

// Função para processar a mensagem quando o client estiver pronto
export const processMessages = async () => {
    client.on('message', async msg => {
        const chat = await msg.getChat();
        const user = msg.from;
    
        if (!userStates[user]) {
            userStates[user] = 'menu';
        }
    
        if (userStates[user] === 'menu' && msg.body.match(/menu|oi|olá|ola/i)) {
            await sendWelcomeMessage(chat, msg);
            userStates[user] = 'waiting_for_option';
            return;
        }
    
        if (userStates[user] === 'waiting_for_option') {
            if (msg.body === '1') {
                userResponses[user] = { currentFieldIndex: 0 };
                userStates[user] = 'collecting_data';
                await startCadastro(user);
            } else {
                await client.sendMessage(user, 'Desculpe, não entendi sua mensagem... Insira uma opção do menu.');
                await sendMenu(chat, msg);
            }
            return;
        }
    
        if (userStates[user] === 'collecting_data') {
            await processCadastroResponse(user, msg);
            return;
        }
    
        if (userStates[user] === 'solicitando_orcamento') {
            await processOrcamentoResponse(user, msg);
            return;
        }
    });
};

async function sendWelcomeMessage(chat, msg) {
    await chat.sendStateTyping();
    await delay(2000);
    const contact = await msg.getContact();
    const name = contact.pushname || 'Cliente';
    await client.sendMessage(
        msg.from,
        `Olá, ${name.split(" ")[0]}! Sou o assistente virtual da Loja de Tintas.\nComo posso ajudá-lo hoje? Digite o número de uma das opções abaixo:\n\n1 - Solicitar orçamento`
    );
}

async function sendMenu(chat, msg) {
    await chat.sendStateTyping();
    await delay(2000);
    await client.sendMessage(msg.from, 'Como posso ajudá-lo hoje? Digite o número de uma das opções abaixo:\n\n1 - Solicitar orçamento');
}

// Lógica de cadastro passo a passo dentro de "Solicitar orçamento"
const cadastroFields = ['Nome', 'Email', 'Telefone', 'CEP', 'Rua', 'Cidade', 'Número da casa', 'CPF', 'Pintor que recomendou'];

async function startCadastro(user) {
    await client.sendMessage(user, 'Para solicitar um orçamento, primeiro precisamos realizar seu cadastro.');
    await askNextField(user);
}

async function askNextField(user) {
    const index = userResponses[user].currentFieldIndex;
    if (index < cadastroFields.length) {
        await client.sendMessage(user, `Por favor, informe seu ${cadastroFields[index].toLowerCase()}:`);
    } else {
        await finalizeCadastro(user);
    }
}

async function processCadastroResponse(user, msg) {
    const index = userResponses[user].currentFieldIndex;
    const campo = cadastroFields[index];
    const valor = msg.body;

    // Verificando a validade do email
    if (campo === 'Email' && !validarEmail(valor)) {
        await client.sendMessage(user, 'Por favor, insira um email válido.');
        return;  // Não avança, fica no mesmo campo
    }

    // Verificando a validade do telefone
    if (campo === 'Telefone' && !validarTelefone(valor)) {
        await client.sendMessage(user, 'Por favor, insira um telefone válido (formato: 41987654321).');
        return;  // Não avança, fica no mesmo campo
    }

    // Armazenando a resposta válida
    userResponses[user][campo] = valor;
    userResponses[user].currentFieldIndex++;  // Avança para o próximo campo

    await askNextField(user);
}

async function finalizeCadastro(user) {
    userResponses[user]['whatsapp'] = user;
    
    await client.sendMessage(user, 'Cadastro realizado com sucesso! Agora, me diga quais tintas você deseja saber o preço.');
    
    userStates[user] = 'solicitando_orcamento';
}

async function processOrcamentoResponse(user, msg) {
    userResponses[user]['tintas'] = msg.body;

    const clientData = {
        Nome: userResponses[user]['Nome'],
        Email: userResponses[user]['Email'],
        Telefone: userResponses[user]['Telefone'],
        CPF: userResponses[user]['CPF'],
        CEP: userResponses[user]['CEP'],
        Rua: userResponses[user]['Rua'],
        Cidade: userResponses[user]['Cidade'],
        'Número da casa': userResponses[user]['Número da casa'],
        Pintor: userResponses[user]['Pintor que recomendou'],
        Tintas: userResponses[user]['tintas']
    };
    
    await chatBotModel.signUpUser(clientData)

    await client.sendMessage(user, 'Ótimo! Um atendente entrará em contato com você em breve para finalizar o orçamento. Agradecemos o seu contato!');

    await enviarParaAtendente(clientData);

    console.log(userStates)
    console.log(userResponses)

    userStates[user] = 'menu';
    delete userResponses[user];
}

async function enviarParaAtendente(user) {
    const atendenteNumero = '5553991287788'; // Código do país + número (Brasil = 55)
    const destinatario = `${atendenteNumero}@c.us`; // Substitua pelo número do atendente

    const mensagemAtendente = `Novo pedido de orçamento!\n\nNome: ${user['Nome']}\nTelefone: ${user['Telefone']}\nEmail: ${user['Email']}\nPintor que recomendou: ${user['Pintor']}\nTinta(s) solicitada(s): ${user['Tintas']}`;

    await client.sendMessage(destinatario, mensagemAtendente);
}

const validarEmail = (email) => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
}

const validarTelefone = (telefone) => {
    const regexTelefone = /\d{2}\d{9}$/; // Exemplo: +55 11 91234-5678
    return regexTelefone.test(telefone);
}