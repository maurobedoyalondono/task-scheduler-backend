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


tasksApp.post(`/`, async (req, res) => {
  const userId = req.get('User-Id');
  const name = req.body.name;
  const description = req.body.description;
  const cronExpression = req.body.cronExpression;
  const type = req.body.type;
  const data = req.body.data;

  const task = {
    name,
    description,
    cronExpression,
    userId,
    type,
    data,
    dateCreated: new Date()
  };

  try {
    const newTask = await TaskManager.createTask(task);

    if (!newTask) {
      return res.status(500).json({ error: 'Unable to create the task' });
    }

    res.json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = tasksApp;