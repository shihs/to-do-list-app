var express = require("express");
var router = express.Router();

const taskController = require("../controllers/taskController");

// Add a new task.
router.post("/add", taskController.add_task);
// Delete a task
router.delete("/delete/:id", taskController.delete_task);
// Move a task between Tasks block and Completed block
router.patch("/:completed/:id", taskController.act_task);

module.exports = router;
