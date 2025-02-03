import prisma from "../prisma.js";


export default authModel = {

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

    }

}