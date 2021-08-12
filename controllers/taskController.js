const db = require("../models");
const Task = db.Task;

// Add a new task
const add_task = async (req, res) => {
  const task = req.body.task;
  console.log(task);

  await Task.create({
    task: task,
  });

  try {
    if (task) {
      add_task(task);
    }
  } catch (err) {
    console.error(err);
    return res.status(400);
  }

  return res.redirect("/");
};

// Delete a task
const delete_task = async (req, res) => {
  const taskId = req.params.id;
  if (taskId) {
    Task.destroy({
      where: {
        id: taskId,
      },
    });
  }

  return res.redirect(304, "/");
};

// Move a task between Tasks block and Completed block
const act_task = async (req, res) => {
  const completed = Number(req.params.completed);
  console.log(completed);
  const taskId = req.params.id;
  await Task.update(
    { completed: completed },
    {
      where: {
        id: taskId,
      },
    }
  );

  return res.redirect(304, "/");
};

module.exports = {
  add_task,
  delete_task,
  act_task,
};
