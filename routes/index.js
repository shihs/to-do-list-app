const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "dev",
  password: "dev",
  database: "dev",
});

const query_data = async (queryString) => {
  const result = await pool.query(queryString);
  return result[0];
};

/* GET home page. */
router.get("/", async (req, res) => {
  var queryString = "SELECT * FROM `todolist` WHERE completed = 0";
  const all_tasks = await query_data(queryString);

  queryString = "SELECT * FROM `todolist` WHERE completed = 1";
  const completed_tasks = await query_data(queryString);

  res.render("index", {
    title: "To Do List App",
    all_tasks: all_tasks,
    completed_tasks: completed_tasks,
  });
});

module.exports = router;
