const jwt = require("jsonwebtoken");
const { addUser, getUser, verifyCredentials } = require('../models/user.model');

const signUp = async (req, res) => {
  const response = await addUser(req.body)
  //Se retorna un codigo y un mensaje dinamico desde la respuesta de agregar usuario. todos las respuesta de esa funcion siguen el mismo esquema {code: xxx, message: xxx}
  return res.status(response.code).json(response);
};

const getMe = async (req, res) => {
 //Como se guardo en el mdw el objeto req.user con el usuario completo, se puede retornar accediendo a req.user desde los endpoints posteriores al mdw isAuth
 const user = req.user;
 return res.status(200).send({code: 200, user})
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const verify = await verifyCredentials(email, password)
    //Se retorna un codigo y un mensaje dinamico cuando existe error al verificar credenciales del usuario.
    //Anteriormente al ejecutarse verifyCredentials, esta funcion no se detenia ante algun error, por lo que siempre se retornaba el token existiera error o no.
    
    if (verify.code !== 200) return res.status(verify.code).send({message: verify.message})
    //Se agrega al token de jwt el id del usuario para poder buscarlo por ese parametro la proxima vez que se requiera auth
    const token = jwt.sign({ email, id: verify.user.id }, "Clave_Muy_Secreta_,_Muy_Segura_y_Muy_Larga")
    return res.send({token})
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
  }
}

const notRoute = (req, res) => {
  res.status(404).json({ code: 404, message: "Esta ruta no existe" })
};

module.exports = { signUp, notRoute, signIn, getMe };