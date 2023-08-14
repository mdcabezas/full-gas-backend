const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  port: process.env.PG_PORT,
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