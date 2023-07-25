const bcrypt = require('bcrypt');
const { pool } = require('../config/db.config');

const getUser = async (email) => {
  try {
    const query = "SELECT * from  usuarios WHERE email = $1"
    const values = [email]
    const { rows } = await pool.query(query, values)
    return { email: rows[0].email, rol: rows[0].rol, lenguage: rows[0].lenguage }
  } catch (error) {
    console.log(error)
    return (error)
  }
};

const verifyCredentials = async (email, password) => {
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
};


module.exports = { addUser, getUser, verifyCredentials };