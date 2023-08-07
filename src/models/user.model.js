const bcrypt = require('bcrypt');
const { pool } = require('../config/db.config');

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

const addUser = async ({ email, nombre, password:contrasena }) => {
  try {
    const passwordEncrypted = bcrypt.hashSync(contrasena, 10)
    const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, DEFAULT)"
    const values = [nombre, email, passwordEncrypted]
    await pool.query(query, values)
    return query
  } catch (error) {
    return (error)
  }
};

module.exports = { addUser, verifyCredentials };