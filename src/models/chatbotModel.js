import prisma from "./prisma.js"

const chatBotModel = {

    signUpUser: async (userData) => {
        try {
            const newUser = await prisma.client.create({
                data: {
                    name: userData['Nome'],
                    email: userData['Email'],
                    phone: userData['Telefone'],
                    cep: userData['CEP'],
                    street: userData['Rua'],
                    city: userData['Cidade'],
                    house_number: userData['Número da casa'],
                    cpf: userData['CPF'],
                    recommender: userData['Pintor'] || null,
                    budgets: {
                        create: {
                            details: userData['tintas'] || null
                        }
                    }
                }, 
                include : {
                    budgets: true
                }
            });

            return newUser
        } catch (error) {
            console.log(error)
        }
    }

}

export default chatBotModel