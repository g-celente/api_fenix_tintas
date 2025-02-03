import jwt from "jsonwebtoken"


async function verifyToken (req, res, next) {

    const token = req.headers["token-auth"]

    if (!token) {
        return res.status(404).json({ auth:false, error: "token not found" })
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ "error": "permissão negada ", "error": err})
        }

        req.userId = decoded.userId
        next()
    })
}

export default verifyToken