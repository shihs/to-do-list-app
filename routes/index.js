const express = require("express");
const router = express.Router();
// const mysql = require("mysql2/promise");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "dev",
//   password: "dev",
//   database: "dev",
// });

// const query_data = async (queryString) => {
//   const result = await pool.query(queryString);
//   return result[0];
// };

/* GET home page. */
// router.get("/", async (req, res) => {
//   var queryString = "SELECT * FROM `todolist` WHERE completed = 0";
//   const all_tasks = await query_data(queryString);

//   queryString = "SELECT * FROM `todolist` WHERE completed = 1";
//   const completed_tasks = await query_data(queryString);

//   res.render("index", {
//     title: "To Do List App",
//     all_tasks: all_tasks,
//     completed_tasks: completed_tasks,
//   });
// });

const db = require("../models");
const Task = db.Task;

const get_tasks_amount = async () => {
  const amount = await Task.count();
  return amount;
};

const add_example_task = async () => {
  const task_amount = await get_tasks_amount();

  if (task_amount <= 1) {
    await Task.bulkCreate([
      {
        task: "Example",
      },
      {
        task: "Sleep",
      },
    ]);
  }
};

add_example_task();

const get_undo_tasks = function () {
  return Task.findAll({
    raw: true,
    completed: 0,
  });
};

const get_done_tasks = function () {
  return Task.findAll({
    raw: true,
    where: {
      completed: 1,
    },
  });
};

router.get("/", async (req, res) => {
  const all_tasks = await get_undo_tasks();
  const completed_tasks = await get_done_tasks();

  res.render("index", {
    title: "To Do List App",
    all_tasks: all_tasks,
    completed_tasks: completed_tasks,
  });
});

module.exports = router;
