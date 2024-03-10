const Pool = require("pg").Pool;

const pool = new Pool({
  user: "users_xoo6_user",
  host: "dpg-cnmorjo21fec73985ni0-a",
  database: "users_xoo6",
  password: "password",
  port: 5432,
});

module.exports = { pool };
