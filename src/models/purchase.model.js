
const { pool } = require('../config/db.config');

const getByIdPurchases = async (id) => {
  try {
    const idPurchase = "SELECT pub.titulo, pub.descripcion, prod.precio, prod.formato, prod.marca, prod.tipo, prod.imagen FROM publicaciones AS pub INNER JOIN productos AS prod ON pub.producto_id = prod.id WHERE pub.id = $1"
    const valuesIdPurchase = [id]
    const { rows: resultIdPurchase } = await pool.query(idPurchase, valuesIdPurchase)
    return resultIdPurchase
  } catch (error) {
    console.log(error)
    return (error)
  }
};

const createPurchase = async ({ email, titulo, descripcion, precio, formato, marca, tipo, imagen }) => {
  try {

    // Buscar id usuario por email
    const idUser = "SELECT id FROM usuarios WHERE email = $1"
    const { rows: [{ id: idUsuario }] } = await pool.query(idUser, [email])
    console.log("idUsuario==>", idUsuario)

    // Excepcion si no encuentra el usuario
    if (!idUsuario) { return [] }

    //Crear producto
    const insertProducto = "INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5, DEFAULT) RETURNING id"
    const valuesProducto = [precio, marca, formato, tipo, imagen]
    const { rows: [{ id: idProducto }] } = await pool.query(insertProducto, valuesProducto)
    console.log("idProducto==>", idProducto)

    // Crear publicacion utilizando id del producto creado
    const insertPublicacion = "INSERT INTO publicaciones VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, DEFAULT) RETURNING *"
    const valuesPublicacion = [idUsuario, idProducto, titulo, descripcion]
    const { rows: resultPublicacion } = await pool.query(insertPublicacion, valuesPublicacion)
    console.log("resultPublicacion==>", resultPublicacion)
    return resultPublicacion
  } catch (error) {
    return (error)
  }
};

module.exports = { createPurchase, getByIdPurchases };