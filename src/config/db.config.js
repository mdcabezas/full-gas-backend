const { Pool } = require("pg");
const pool = new Pool({
  host: "127.0.0.1",
  user: "postgres",
  password: "miclavesecreta",
  database: "fullgas",
  allowExitOnIdle: true
})

pool.connect(async (err, _) => {
  if (err) {
    console.error("ERROR connect DB:", err)
  } else {
    console.log("OK connect DB");
    await pool.query("CREATE TABLE IF NOT EXISTS usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password VARCHAR(60) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) ) ")
  }
}
);

module.exports = { pool };