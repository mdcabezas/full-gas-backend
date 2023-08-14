const bcrypt = require('bcrypt');
const { pool } = require('../config/db.config');

const verifyCredentials = async (email, password) => {
  try {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)

    if (!rowCount) return { code: 404, message: "Usuario no encontrado" }

    const { password: passwordEncrypted } = usuario
    const passwordPass = bcrypt.compareSync(password, passwordEncrypted)
    if (!passwordPass) return { code: 401, message: "Email o contraseña incorrecta" }
    return { code: 200, user: usuario }
  } catch (error) {
    return { code: 500, message: error }
  }
}

const addUser = async ({ email, nombre, password }) => {
  try {
    const passwordEncrypted = bcrypt.hashSync(password, 10)
    const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, DEFAULT)"
    const values = [nombre, email, passwordEncrypted]
    await pool.query(query, values)
    return { code: 201, message: "Usuario creado exitosamente" }
  } catch (error) {
    return { code: 500, message: error }
  }
};

module.exports = { addUser, verifyCredentials };