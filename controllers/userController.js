const { pool } = require("../db");

function checkId(req, res, next, id) {
  req.id = id;
  next();
}

function getUsers(req, res) {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res
      .status(200)
      .json({ info: "NODE, EXPRESS and POSTGRES", data: results.rows });
  });
}

function getUserById(req, res) {
  pool.query(
    "SELECT * FROM users WHERE id = $1",
    [req.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.send({ status: "success", data: results.rows });
    }
  );
}

function createUser(req, res) {
  const { name, email } = req.body;
  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(201).json({ status: "success", data: results.rows });
    }
  );
}

function updateUser(req, res) {
  const { name, email } = req.body;
  const id = req.id;
  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json({
        status: "success",
        userId: id,
        updates: results.rows,
      });
    }
  );
}

function deleteUser(req, res) {
  const id = req.id;
  pool.query("DELETE FROM users WHERE id=$1", [id], (error, response) => {
    if (error) {
      throw error;
    }
    res.status(204).send(`User deleted`);
  });
}

module.exports = {
  checkId,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
