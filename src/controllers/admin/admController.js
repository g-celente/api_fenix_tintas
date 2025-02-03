import admModel from "../../models/admin/admModel.js";

export default admController = {

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

    }

}