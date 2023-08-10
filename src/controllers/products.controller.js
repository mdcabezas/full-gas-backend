const {
  getAllProducts,
  getByIdProducts,
} = require('../models/product.model');


const getAll = async (req, res) => {
  try {
    const item = await getAllProducts();
    return res.status(200).json({ code: 200, message: "getAllProducts", data: item });
  } catch (error) {
    console.log(error)
    return res.status(error.code || 500).send(error)
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getByIdProducts(id);
    return res.json({ code: 200, message: "getByIdProducts", data: item });
  } catch (error) {
    console.log(error)
    return res.status(error.code || 500).send(error)
  }
};

module.exports = { getAll, getById };