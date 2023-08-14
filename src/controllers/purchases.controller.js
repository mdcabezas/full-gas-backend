const {
  createPurchase,
  getAllByIdPurchases
} = require('../models/purchase.model');

const create = async (req, res) => {
  try {
    const reqBody = req.body;
    const {usuario:idUsuario} = req.user
    if(!idUsuario){
    return res.status(401).json({ code: 401, message: "Proporcionar credenciales para acceder al recurso.", data: {} });  
    }
    const item = await createPurchase(idUsuario, reqBody);
    return res.status(201).json({ code: 201, message: "Compra creada con exito", data: item });
  } catch (error) {
    console.log(error)
    return res.status(error.code || 500).send(error)
  }
};

const getAllById = async (req, res) => {
  try {
    const {usuario:idUsuario} = req.user
    if(!idUsuario){
      return res.status(401).json({ code: 401, message: "Proporcionar credenciales para acceder al recurso.", data: {} });  
      }
    const item = await getAllByIdPurchases(idUsuario);
    return res.json({ code: 200, message: "getByIdPurchases", data: item });
  } catch (error) {
    console.log(error)
    return res.status(error.code || 500).send(error)
  }
};

module.exports = { create, getAllById };