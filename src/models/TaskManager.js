const scheduler = require('./Scheduler');
const taskEventManager = require('./TaskEventManager');
const TaskExecutorFactory = require('./TaskExecutorFactory');

const dataManager = require('../data/DataManager');

class TaskManager {
  constructor() {
  }

  static getTasksByUser(userId) {
    return dataManager.getTasksByUserId(userId);
  }

  static getTaskById(taskId) {
     return dataManager.getTasksById(taskId);
  }

  static async getAllTasks() {
    return dataManager.getAllTasks();
  }

  static init() {
    taskEventManager.on("taskCompleted", (task, response) => {
      console.log("Task execution completed: " + task.id + new Date().toString());
    
      dataManager.updateTaskExecution(task.id, response);
    });

    TaskManager.scheduleAllTasks();
  }

  static async scheduleAllTasks() {
    const tasks = await TaskManager.getAllTasks();

    console.log('# Tasks to be scheduled: ' + tasks.length);

    tasks.forEach(task => {
      scheduler.scheduleTask(TaskExecutorFactory.createTaskExecutor(task));
    });
  }

  static async createTask(task) {
    const newTask = await dataManager.createTask(task);

    scheduler.scheduleTask(TaskExecutorFactory.createTaskExecutor(newTask));

    return new Promise((resolve, reject) => {
      resolve(newTask);
    });
  }
}

module.exports = TaskManager;
