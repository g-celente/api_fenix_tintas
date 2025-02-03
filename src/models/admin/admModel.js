import prisma from "../prisma.js";


const admModel = {

    getBudgets: async () => {

        try {
            const budgets = await prisma.client.findMany();

            if (!budgets) {
                return 
            }

            return budgets;
            
        } catch (e) {
            console.log(e)
            return 
        }

    },

    getClientById: async (id) => {
        try {

            const client = await prisma.client.findFirst({
                where: {
                    id: id
                }
            })

            if (!client) {
                return
            }

            return client

        } catch (error) {
            console.log(error)
        }
    },

    getTotalClients: async () => {
        try {
            const totalClients = await prisma.client.count()

            return totalClients
        } catch (error) {
            console.log(error)
            return 0;
        }

    },

    getClientsWithBudgets: async () => {
        try {
            const totalClientsWithBudgets = await prisma.client.count({
                where: {
                    budgets: {
                        some: {}
                    }
                }
            })  

            return totalClientsWithBudgets;
        } catch (error) {
            console.log(error)
            return 0
        }
    },

    getClientsWithRecommender: async () => {
        try {
            const totalClientsWithRecommender = await prisma.client.count({
                where: {
                    recommender: {
                        not: null // Verifica se o cliente tem recomendação
                    }
                }
            });
            return totalClientsWithRecommender;
        } catch (error) {
            console.error('Error fetching clients with recommender:', error);
            return 0;
        }
    },

    getClientsByMonth:  async () => {
        try {
            const clientsByMonth = await prisma.$queryRaw`
                SELECT 
                    EXTRACT(MONTH FROM "createdAt") AS month, 
                    COUNT(id) AS total 
                FROM "Client"
                GROUP BY month
                ORDER BY month;
            `;
            return clientsByMonth;
        } catch (error) {
            console.error('Error fetching clients by month:', error);
            return [];
        }
    }

}

export default admModel