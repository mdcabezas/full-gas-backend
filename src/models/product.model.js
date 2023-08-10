
const { pool } = require('../config/db.config');

const getByIdProducts = async (id) => {
  try {
    const idProduct = "SELECT * from productos WHERE id = $1"
    const valuesIdProduct = [id]
    const { rows: resultIdProduct } = await pool.query(idProduct, valuesIdProduct)
    return resultIdProduct
  } catch (error) {
    console.log(error)
    return (error)
  }
};

const getAllProducts = async () => {
  try {
    const query = "SELECT * FROM productos"
    const { rows } = await pool.query(query)
    return rows
  } catch (error) {
    console.log(error)
    return (error)
  }
};

module.exports = { getAllProducts, getByIdProducts };