const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    try {

        const Authorization = req.header("Authorization");

        if (!Authorization) {
            return res.status(401).json({ code: 401, message: "Proporcionar Token para acceder al recurso." });
        }
        const token = Authorization.split("Bearer ")[1];
        const { email, usuario } = jwt.verify(token, process.env.SECRET_JWT);

        if (!email || !usuario) {
            return res.status(401).json({ code: 401, message: "Proporcionar credenciales para acceder al recurso." });
        }
        req.user = { email, usuario }
        next()
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}

module.exports = { isAuth };