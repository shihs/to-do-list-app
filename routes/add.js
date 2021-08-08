var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "dev",
  password: "dev",
  database: "dev",
});

const add_task = async (task) => {
  const queryString =
    "INSERT INTO `todolist` (`id`, `tasks`, `completed`, `create_time`, `modified_time`) VALUES (NULL, ?, '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";

  const result = await pool.query(queryString, [task]);
  return result[0].insertId;
};

/* Add a new task. */
router.post("/", async (req, res) => {
  const task = req.body.task;
  if (task) {
    const insert_id = await add_task(task);
  } else {
    console.log("Task cannot be empty");
  }

  return res.redirect("/");
});

// router.delete("/", async (req, res) => {
//   // const task = req.params;
//   console.log(req.params);
//   console.log(req.body);
//   // if (task) {
//   //   const insert_id = await add_task(task);
//   // } else {
//   //   console.log("Task cannot be empty");
//   // }

//   return res.redirect("/");
// });

module.exports = router;
