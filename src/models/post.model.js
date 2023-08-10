
const { pool } = require('../config/db.config');

const getByIdPosts = async (id) => {
  try {
    const idPost = "SELECT pub.titulo, pub.descripcion, prod.precio, prod.formato, prod.marca, prod.tipo, prod.imagen FROM publicaciones AS pub INNER JOIN productos AS prod ON pub.producto_id = prod.id WHERE pub.id = $1"
    const valuesIdPost = [id]
    const { rows: resultIdPost } = await pool.query(idPost, valuesIdPost)
    return resultIdPost
  } catch (error) {
    console.log(error)
    return (error)
  }
};


const createPost = async ({ email, titulo, descripcion, precio, formato, marca, tipo, imagen }) => {
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


const getAllPosts = async () => {
  try {
    const query = "SELECT pub.titulo, pub.descripcion, prod.precio, prod.formato, prod.marca, prod.tipo, prod.imagen FROM publicaciones AS pub INNER JOIN productos AS prod ON pub.producto_id = prod.id"
    const { rows } = await pool.query(query)
    return rows
  } catch (error) {
    console.log(error)
    return (error)
  }
};



const updateByIdPosts = async (idPublicacion, 
  { titulo: tituloPublicacion,
     descripcion: descripcionPublicacion,
      precio: precioProducto,
       formato: formatoProducto,
        marca: marcaProducto,
         tipo: tipoProducto,
          imagen: imagenProducto }) => {
  try {

    await pool.query('BEGIN');

    // Actualizar titulo y descripcion en la tabla "productos"
    const queryPublicacion = "UPDATE publicaciones SET (titulo, descripcion) = ($1, $2) WHERE id = $3 RETURNING producto_id"
    const valuesPublicacion = [tituloPublicacion, descripcionPublicacion, idPublicacion]
    const { rows: [{ producto_id }] } = await pool.query(queryPublicacion, valuesPublicacion);

    // Actualizar las datos del producto relacionados con la publicacion actualizada
    const queryProducto = "UPDATE productos SET (precio, marca, formato, tipo, imagen) = ($1, $2, $3, $4, $5) WHERE id = $6" 
    const valuesProducto = [precioProducto, marcaProducto, formatoProducto, tipoProducto, imagenProducto, producto_id]
    await pool.query(queryProducto, valuesProducto);

    await pool.query('COMMIT');
    // const { rows: resultPublicacion, rowCount:publicacionesActualizadas } = await pool.query(deleteSoftPublicacion, valuePublicacion)
    return []
  } catch (error) {
    await pool.query('ROLLBACK');
    return (error)
  }
};

const deleteByIdPosts = async (id) => {
  try {
    //Eliminar Publicacion (Soft Delete)
    const deleteSoftPublicacion = "UPDATE publicaciones SET is_active = false WHERE id = $1 AND EXISTS (SELECT id FROM publicaciones WHERE id = $2 AND is_active = true) RETURNING *"
    const valuePublicacion = [id,id]
    const { rows: resultPublicacion, rowCount:publicacionesActualizadas } = await pool.query(deleteSoftPublicacion, valuePublicacion)
    return {resultPublicacion, publicacionesActualizadas}
  } catch (error) {
    console.log(error)
    return (error)
  }
}

module.exports = { createPost, getAllPosts, getByIdPosts, updateByIdPosts, deleteByIdPosts };