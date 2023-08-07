
const { pool } = require('../config/db.config');

// const getPost = async (id) => {
//   try {
//     const query = "SELECT * from  usuarios WHERE id = $1"
//     /*SELECT pub.titulo, pub.descripcion, prod.precio, prod.formato, prod.marca, prod.tipo, prod.imagen  
//     FROM publicaciones AS pub INNER JOIN productos AS prod 
//     ON pub.producto_id = prod.id; */
//     const values = [id]
//     const { rows } = await pool.query(query, values)
//     return { email: rows[0].email, rol: rows[0].rol, lenguage: rows[0].lenguage }
//   } catch (error) {
//     console.log(error)
//     return (error)
//   }
// };


const getAllPosts = async () => {
  try {
    //const query = "SELECT pub.id, pub.titulo, pub.descripcion, prod.precio, prod.formato, prod.marca, prod.tipo, prod.imagen FROM publicaciones AS pub INNER JOIN productos AS prod ON pub.producto_id = prod.id"
    const query = "SELECT * FROM productos"
    const { rows } = await pool.query(query)
    return rows
  } catch (error) {
    console.log(error)
    return (error)
  }
};

const getByIdPosts = async (id) => {
  const query = "SELECT * FROM productos WHERE id = $1"
  const values = [id]
  try {
    const { rows: [post], rowCount } = await pool.query(query, values)
    if (!rowCount) return { code: 404, message: "Post no encontrado" }
    return {code: 200, post}
  } catch (error) {
    console.error('error al obetener el post por id', error);
    return { code: 500, message: error };
  }
};

const createPost = async (post) => {
  const query = 'INSERT INTO productos VALUES (DEFAULT, $1, $2, $3, $4, $5)';
  const values = [post.precio, post.marca, post.formato, post.tipo, post.imagen];
  await pool.query(query, values);
  return { mensaje: 'post agregado' };
}

/* const deleteByIdPosts = async (id) => {
  const consulta = 'DELETE FROM posts WHERE id = $1'
    const values = [id];
    await pool.query(consulta, values);
    return { mensaje: 'Post eliminado' };
} */

const updateByIdPosts = () => console.log("updateByIdPosts")


/* const verifyCredentials = async (email, password) => {
  try {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)
    const { password: passwordEncrypted } = usuario
    const passwordPass = bcrypt.compareSync(password, passwordEncrypted)
    if (!passwordPass || !rowCount)
      throw { code: 401, message: "Email o contraseña incorrecta" }
  } catch (error) {
    return (error)
  }
}

const addUser = async ({ email, password, rol, lenguage }) => {
  try {
    const passwordEncrypted = bcrypt.hashSync(password, 10)
    const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)"
    const values = [email, passwordEncrypted, rol, lenguage]
    await pool.query(query, values)
    return query
  } catch (error) {
    return (error)
  }
}; */



module.exports = { createPost, getAllPosts, getByIdPosts, updateByIdPosts/* , deleteByIdPosts  */};