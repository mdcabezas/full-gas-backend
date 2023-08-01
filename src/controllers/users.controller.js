const jwt = require("jsonwebtoken");
const { addUser, getUser, verifyCredentials } = require('../models/user.model');

const signUp = async (req, res) => {
  addUser(req.body)
  res.status(201).json({ code: 201, message: "Usuario ingresado correctamente" });
};

const getUserAuthenticate = async (req, res) => {
  const { id } = req.params;
  const item = await getUser(id);
  res.json(item);
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    await verifyCredentials(email, password)
    const token = jwt.sign({ email }, "Clave_Muy_Secreta_,_Muy_Segura_y_Muy_Larga")
    res.send(token)
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).send(error)
  }
}

const notRoute = (req, res) => {
  res.status(404).json({ code: 404, message: "Esta ruta no existe" })
};

module.exports = { signUp, notRoute, signIn, getUserAuthenticate };