const jwt = require("jsonwebtoken");
const { addUser, getUser, verifyCredentials } = require('../models/user.model');

const newUser = async (req, res) => {
  console.log(req.body)
  addUser(req.body)
  res.status(201).json({ code: 201, message: "Usuario ingresado correctamente" });
};

const getUserAuthenticate = async (req, res) => {
  const { email } = req.body;
  const item = await getUser(email);
  res.json(item);
};

const getSignin = async (req, res) => {
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

module.exports = { newUser, notRoute, getSignin, getUserAuthenticate };