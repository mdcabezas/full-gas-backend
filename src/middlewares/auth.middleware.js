const jwt = require("jsonwebtoken");
const { getUser } = require("../models/user.model");

const isAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization)
            throw new Error('No tiene Token de autorización');

        const Authorization = req.header("Authorization");
        const token = Authorization.split("Bearer ")[1];

        //No se deconstruye el json con la decodificacion del token porque asi podemos validar la existencia todal del objeto
        //Se utiliza la funcion decode en vez de verify porque verify solo verifica si el token es valido para ese secret mientras que decode lo decodifica y podemos acceder a los datos
        //Se recomienda guardar el secret como una ENV para que no quede expuesta
        const payload = jwt.decode(token, "Clave_Muy_Secreta_,_Muy_Segura_y_Muy_Larga");

        //Con los datos del token (se guardó el id y el correo) podemos ir a buscar si existe el usuario o no en base de datos
        const response = await getUser(payload.id);

        //Si el usuario no existe (es decir un code distinto de 200 se retorna un status dinamico y un message dinamico segun el error detectado)
        if (response.code !== 200) {
            //cuando se invoque al objeto res SIEMPRE anteponer return ya que esto indica el fin de la ejecucion del endpoint, si existe algo mas debajo y no se antepone return, lo ejecutara igualmente.
            return res.status(response.code).send({error: response.message})
        }

        //Se asocia el objeto completo del usuario recuperado al req.user, para poder utilizarlo en cualquier endpoint que requiera auth y asi evitamos una llamada extra a la base de datos para buscar al usuario
        req.user = response.user
        next();

    } catch (error) {
         return res.status(401).json({ error: error.message });
    }

}

module.exports = { isAuth };