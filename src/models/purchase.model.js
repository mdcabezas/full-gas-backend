
const { pool } = require('../config/db.config');

const getAllByIdPurchases = async (idUsuario) => {
  try {
    const queryIdUserPurchases = "SELECT p.id AS producto_id, p.precio AS precio_producto, p.marca AS marca_producto, p.formato AS formato_producto, p.tipo AS tipo_producto, p.imagen AS imagen_producto, c.transaccion, c.cantidad, c.precio_total, c.created_at, pub.titulo FROM productos p JOIN publicaciones pub ON p.id = pub.producto_id JOIN compras c ON pub.id = c.publicaciones_id WHERE c.usuario_id = $1"
    const valuesIdUserPurchases = [idUsuario]
    const { rows: resultIdUserPurchase } = await pool.query(queryIdUserPurchases, valuesIdUserPurchases)
    return resultIdUserPurchase
  } catch (error) {
    console.log(error)
    return (error)
  }
};

const createPurchase = async (idUsuario, reqBody) => {
  try {

    const idTransaccion = Math.random().toString(36).substring(4, 13);

    for await (const item of reqBody) {
      const idPost = "SELECT prod.precio FROM publicaciones AS pub INNER JOIN productos AS prod ON pub.producto_id = prod.id WHERE pub.id = $1"
      const valuesIdPost = [item.publicaciones_id]
      const { rows: [{ precio }] } = await pool.query(idPost, valuesIdPost)
      const query = "INSERT INTO compras (usuario_id, publicaciones_id, transaccion, cantidad, precio_total ) VALUES ($1, $2, $3, $4, $5)"
      await pool.query(query, [idUsuario, item.publicaciones_id, idTransaccion, item.cantidad, precio * item.cantidad]);
    }

    const queryComprasIdTransaccion = "SELECT * FROM compras WHERE usuario_id = $1 AND transaccion = $2"
    const valuesIdTransaccion = [idUsuario, idTransaccion]
    const { rows: resultComprasIdTransaccion } = await pool.query(queryComprasIdTransaccion, valuesIdTransaccion)
    return resultComprasIdTransaccion
  } catch (error) {
    return (error)
  }
};

module.exports = { createPurchase, getAllByIdPurchases };