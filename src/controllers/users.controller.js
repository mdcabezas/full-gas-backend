const jwt = require("jsonwebtoken");
const { addUser, verifyCredentials } = require('../models/user.model');

const signUp = async (req, res) => {
  addUser(req.body)
  return res.status(201).json({ code: 201, message: "Usuario ingresado correctamente" });
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const {code, user, message} = await verifyCredentials(email, password)
    if (code !== 200) return res.status(code).send({message: message})
    const token = jwt.sign({ email, usuario:user.id }, process.env.SECRET_JWT)
    return res.json({token, nombre:user.nombre, email:user.email, id:user.id})
  } catch (error) {
    console.log(error)
    return res.status(error.code || 500).send(error)
  }
}

const profile = async (req, res) => res.send("Endpoint Profile")

module.exports = { signUp, signIn, profile };