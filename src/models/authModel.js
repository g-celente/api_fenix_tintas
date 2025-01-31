import prisma from "./prisma.js"

const authModel = {

    signIn: async (data) => {

        try {
            const user = await prisma.login.findFirst({
                where: {
                    email: data.email
                }
            })

            if (!user || user.password != data.password) {
                return
            }

        } catch (e) {
            console.log('error' + e)
        }

    }

}


export default authModel