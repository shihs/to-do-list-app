var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "dev",
  password: "dev",
  database: "dev",
});

// Add a new task
const add_task = async (task) => {
  const queryString =
    "INSERT INTO `todolist` (`id`, `tasks`, `completed`, `create_time`, `modified_time`) VALUES (NULL, ?, '0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);";

  const result = await pool.query(queryString, [task]);
  return result[0].insertId;
};

// Delete a task
const delete_task = async (taskId) => {
  const queryString = "DELETE FROM `todolist` WHERE id = ?;";

  const result = await pool.query(queryString, [taskId]);
  return result[0].changedRows; // 1 is success
};

// Move a task from Tasks block to Completed block
const complete_task = async (taskId) => {
  const queryString = "UPDATE `todolist` SET completed = 1 WHERE id = ?;";

  const result = await pool.query(queryString, [taskId]);
  console.log(result);
  //   return result[0].insertId;
};

// Move a task from Completed block to Tasks block
const uncomplete_task = async (taskId) => {
  const queryString = "UPDATE `todolist` SET completed = 0 WHERE id = ?;";

  const result = await pool.query(queryString, [taskId]);
  console.log(result);
  //   return result[0].insertId;
};

// Add a new task.
router.post("/add", async (req, res) => {
  const task = req.body.task;

  try {
    if (task) {
      const insertId = await add_task(task);
    } else {
      console.log("Task cannot be empty");
    }
  } catch (err) {
    console.error(err);
    return res.status(400);
  }

  return res.redirect("/");
});

router.delete("/delete/:id", async (req, res) => {
  const taskId = req.params.id;

  if (taskId) {
    await delete_task(taskId);
  }

  return res.redirect(304, "/");
});

router.patch("/complete/:id", async (req, res) => {
  const taskId = req.params.id;
  console.log(taskId);

  if (taskId) {
    await complete_task(taskId);
  }

  return res.redirect(304, "/");
});

router.patch("/uncomplete/:id", async (req, res) => {
  const taskId = req.params.id;
  console.log(taskId);

  if (taskId) {
    await uncomplete_task(taskId);
  }

  return res.redirect(304, "/");
});

module.exports = router;
