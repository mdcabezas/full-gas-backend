const jwt = require("jsonwebtoken");
const { addUser, verifyCredentials } = require('../models/user.model');

const signUp = async (req, res) => {
  addUser(req.body)
  return res.status(201).json({ code: 201, message: "Usuario ingresado correctamente" });
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    await verifyCredentials(email, password)
    const token = jwt.sign({ email }, "Clave_Muy_Secreta_,_Muy_Segura_y_Muy_Larga")
    return res.send(token)
  } catch (error) {
    console.log(error)
    return res.status(error.code || 500).send(error)
  }
}

const profile = async (req, res) => res.send("Endpoint Profile")

module.exports = { signUp, signIn, profile };