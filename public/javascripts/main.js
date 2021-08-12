// delete a task
function deleteTask(taskId) {
  return $.ajax({
    url: `/tasks/delete/${taskId}`,
    method: "delete",
    timeout: 0,

    error: (error) => {
      console.error(error);
    },
  }).then(function (data) {
    window.location.reload(); // to refresh
  });
}

function actTask(completed, taskId) {
  return $.ajax({
    url: `/tasks/${completed}/${taskId}`,
    method: "patch",
    timeout: 0,

    error: (error) => {
      console.error(error);
    },
  }).then(function (data) {
    window.location.reload(); // to refresh
  });
}

// function UncompleteTask(taskId) {
//   return $.ajax({
//     url: `/tasks/uncomplete/${taskId}`,
//     method: "patch",
//     timeout: 0,

//     success: () => {
//       location.reload();
//     },

//     error: (error) => {
//       console.error(error);
//     },
//   });

//   .then(function (data) {
//     window.location.reload(); // to refresh
//   });
// }
