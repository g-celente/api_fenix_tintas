import admModel from "../../models/admin/admModel.js";

const admController = {

    getBudgets: async (req, res) => {

        try {

            const budgets = await admModel.getBudgets() 

            if (!budgets) {
                return res.status(400).json({ error: "não foi possível encontrar dados ou não existe"})
            }

            return res.status(200).json(budgets)

        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e})
        }

    },

    getClientById: async (req, res) => {
        try {
            
            const client = await admModel.getClientById(req.body.id)

            if (!client) {
                return res.status(404).json({ error: "client not found"})
            }

            return res.status(200).json(client)
        } catch (error) {
            console.log(error)
        }
    },

    getClientStatus: async (req, res) => {
        try {
            const totalClients = await admModel.getTotalClients();
            const clientsWithBudgets = await admModel.getClientsWithBudgets();
            const clientsWithRecommender = await admModel.getClientsWithRecommender();
            const clientsByMonth = await admModel.getClientsByMonth();

            const clientsByMonthSerializable = clientsByMonth.map(result => ({
                ...result,
                month: Number(result.month), // Se "month" for BigInt
                total: Number(result.total)  // Se "total" for BigInt
            }))
    
            res.json({
                totalClients,
                clientsWithBudgets,
                clientsWithRecommender,
                clientsByMonthSerializable
            });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to fetch client stats' });
        }
    }

}

export default admController