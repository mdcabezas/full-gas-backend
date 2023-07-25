const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization)
            throw new Error('No tiene Token de autorización');

        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];
        const { email } = jwt.verify(token, "Clave_Muy_Secreta_,_Muy_Segura_y_Muy_Larga");

        if (!email) {
            throw new Error("No tienes permisos");
        } else {
            req.body.email = email
            next()
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }

}

module.exports = { isAuth };