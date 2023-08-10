const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization)
            throw new Error('No tiene Token de autorización');

        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        const { email } = jwt.verify(token, process.env.SECRET_JWT);

        if (!email) {
            throw new Error("No tienes permisos");
        } else {
            req.body.email = email
            next()
        }
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

module.exports = { isAuth };