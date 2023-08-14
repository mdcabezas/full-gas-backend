
const { pool } = require('../config/db.config');

const getByIdPosts = async (id) => {
  try {
    // const idPost = "SELECT pub.titulo, pub.descripcion, prod.precio, prod.formato, prod.marca, prod.tipo, prod.imagen FROM publicaciones AS pub INNER JOIN productos AS prod ON pub.producto_id = prod.id WHERE pub.id = $1"
    const idPost = "SELECT pb.usuario_id, pb.titulo, pb.descripcion, pb.created_at, u.nombre, pr.precio, pr.formato, pr.marca, pr.tipo, pr.imagen FROM publicaciones AS pb JOIN usuarios AS u ON pb.usuario_id = u.id JOIN productos AS pr ON pb.producto_id = pr.id WHERE pb.usuario_id = $1"
    const valuesIdPost = [id]
    const { rows: [resultIdPost] } = await pool.query(idPost, valuesIdPost)
    return resultIdPost
  } catch (error) {
    console.log(error)
    return (error)
  }
};

const getByIdUserPosts = async (idUser) => {
  try {
    const idPost = "SELECT pub.titulo, pub.descripcion, prod.precio, prod.formato, prod.marca, prod.tipo, prod.imagen FROM publicaciones AS pub INNER JOIN productos AS prod ON pub.producto_id = prod.id WHERE pub.usuario_id = $1 AND pub.is_active = TRUE"
    const valuesIdPost = [idUser]
    const { rows: resultIdPost } = await pool.query(idPost, valuesIdPost)
    return resultIdPost
  } catch (error) {
    console.log(error)
    return (error)
  }
};


const createPost = async (idUsuario, { titulo, descripcion, producto_id }) => {
  try {
    // Crear publicacion utilizando id del producto creado
    const insertPublicacion = "INSERT INTO publicaciones VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, DEFAULT) RETURNING *"
    const valuesPublicacion = [idUsuario, producto_id, titulo, descripcion]
    const { rows: resultPublicacion } = await pool.query(insertPublicacion, valuesPublicacion)
    console.log("resultPublicacion==>", resultPublicacion)
    return resultPublicacion
  } catch (error) {
    return (error)
  }
};

const getAllPosts = async () => {
  try {
    const query = "SELECT pub.id, pub.titulo, pub.descripcion, prod.precio, prod.formato, prod.marca, prod.tipo, prod.imagen FROM publicaciones AS pub INNER JOIN productos AS prod ON pub.producto_id = prod.id WHERE pub.is_active = TRUE"
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

module.exports = { createPost, getAllPosts, getByIdPosts, updateByIdPosts, deleteByIdPosts, getByIdUserPosts };