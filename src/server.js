
const express = require("express");

const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

// Create Task
app.post("/tasks", (req, res) => {
  const task = {
    id: nextId++,
    title: req.body.title,
    completed: false
  };

  tasks.push(task);

  res.status(201).json(task);
});

// List Tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// Update Task
app.put("/tasks/:id", (req, res) => {
  const task = tasks.find(
    t => t.id === Number(req.params.id)
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.title = req.body.title ?? task.title;
  task.completed = req.body.completed ?? task.completed;

  res.status(200).json(task);
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter(t => t.id !== id);

  res.status(200).json({
    message: "Task deleted"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
