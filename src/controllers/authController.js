import authModel from "../models/authModel.js";
import Joi from "joi";
import jwt from "jsonwebtoken"

const authController = {

    signIn: async (req, res) => {
        const schema = Joi.object ({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        })

        const { error } = schema.validate(req.body)

        if (error) {
            return res.status(400).json({error: error.details[0].message})
        }

        try {

            const user = await authModel.signIn(req.body) 

            if (user) {
                
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: 5000
                })

                return res.status(200).json({ auth: true, token:token})
            }
            
            return res.status(404).json({ 'error': 'usuário ou senha incorretos'})

        } catch (e) {
            return res.json({ 'error': e})
        }

    }

}

export default authController;