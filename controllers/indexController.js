const db = require("../models");
const Task = db.Task;

const count_tasks = async () => {
  return Task.count();
};

const add_example_tasks = async () => {
  const task_amount = await count_tasks();

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

add_example_tasks();

const get_undo_tasks = function () {
  return Task.findAll({
    raw: true,
    where: {
      completed: 0,
    },
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

const load_page = async (req, res) => {
  const all_tasks = await get_undo_tasks();
  const completed_tasks = await get_done_tasks();

  res.render("index", {
    title: "To Do List App",
    all_tasks: all_tasks,
    completed_tasks: completed_tasks,
  });
};

module.exports = {
  load_page,
};
