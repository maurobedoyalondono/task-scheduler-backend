const express = require("express");
const tasksApp = express();

const TaskManager = require('../models/TaskManager');

tasksApp.use((req, res, next) => {
  //TODO: This should be a TOKEN instead, however the security functionality is out of the scope, this is doing as a basic validation
  const userId = req.get('User-Id'); 

  if (!userId) {
    res.status(403).end();

    return;
  }

  next();
});

tasksApp.get(`/:taskid`, async (req, res) => {
  const taskId = req.params.taskid;
  const userId = req.get('User-Id');

  try {
    const task = await TaskManager.getTaskById(taskId, userId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId != userId) {
      return res.status(403).json({ error: 'Access Forbidden' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

tasksApp.get(`/`, (req, res) => {
  const userId = req.get('User-Id');

  res.json(TaskManager.getTasksByUser(userId));
});


tasksApp.post(`/`, (req, res) => {
  const newTask = {
    id: 1,
    dateCreated: new Date(),
  };

  res.json(newTask);
});

module.exports = tasksApp;