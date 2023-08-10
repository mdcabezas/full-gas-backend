const {
  createPurchase,
  getByIdPurchases
} = require('../models/purchase.model');

const create = async (req, res) => {
  try {
    const reqBody = req.body;
    const item = await createPurchase(reqBody);
    return res.status(201).json({ code: 201, message: "Publicacion creada con exito", data: item });
  } catch (error) {
    console.log(error)
    return res.status(error.code || 500).send(error)
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getByIdPurchases(id);
    return res.json({ code: 200, message: "getByIdPurchases", data: item });
  } catch (error) {
    console.log(error)
    return res.status(error.code || 500).send(error)
  }
};

module.exports = { create, getAll, getById, updateById, deleteById };