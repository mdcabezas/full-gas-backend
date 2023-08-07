const bcrypt = require('bcrypt');
const { pool } = require('../config/db.config');

const getUser = async (id) => {
  try {
    const query = "SELECT * from  usuarios WHERE id = $1"
    const values = [id]
    const { rows: [usuario], rowCount } = await pool.query(query, values)
    if (!rowCount) return { code: 404, message: "Usuario no encontrado" }
    return { code: 200, user: usuario }
  } catch (error) {
    console.log(error)
    return { code: 500, message: error }
  }
};

const verifyCredentials = async (email, password) => {
  try {
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const { rows: [usuario], rowCount } = await pool.query(consulta, values)

    //Se valida por separado si existe el usuario o no, ya que en caso de no existir no se puede deconstruir la password mas adelante.
    if (!rowCount) return { code: 404, message: "Usuario no encontrado" }

    const { contrasena: passwordEncrypted } = usuario
    const passwordPass = bcrypt.compareSync(password, passwordEncrypted)
    //Se valida si la contraseña es la correcta o no.
    if (!passwordPass) return { code: 401, message: "Email o contraseña incorrecta" }

    // Todos los returns siguen el mismo formato {code: xxx, message: xxx} ya que asi es mas facil de evaluar los errores y los exitos de la función.
    return { code: 200, user: usuario }
  } catch (error) {
    return { code: 500, message: error }
  }
}

//Se elimina rol y lenguage porque esos campos no estaban en la tabla de la base de datos.
const addUser = async ({ email, password, nombre }) => {
  try {
    const passwordEncrypted = bcrypt.hashSync(password, 10)
    const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3)"
    const values = [nombre, email, passwordEncrypted]
    await pool.query(query, values)
    return { code: 201, message: "Usuario creado exitosamente" }
  } catch (error) {
    return { code: 500, message: error }
  }
};


module.exports = { addUser, getUser, verifyCredentials };