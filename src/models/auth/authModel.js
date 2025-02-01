import prisma from "../prisma.js"
import bcrypt from "bcrypt"


const authModel = {

    signIn: async (data) => {

        try {
            const user = await prisma.login.findFirst({
                where: {
                    email: data.email
                }
            })

            const passwordMatch = await bcrypt.compare(data.password, user.password)

            if (!user || !passwordMatch) {
                return
            }

            return user

        } catch (e) {
            console.log('error ' + e)
            return 
        }

    },

    signUp: async (data) => {

        const cryptPassword = await bcrypt.hash(data.password, 10)

        try {

            const newUser = await prisma.login.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: cryptPassword
                }
            })

            return newUser

        } catch (e) {
            console.log(e)
            return None
        }

    }

}


export default authModel