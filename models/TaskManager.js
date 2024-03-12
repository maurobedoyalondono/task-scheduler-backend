const scheduler = require('./Scheduler');
const taskEventManager = require('./TaskEventManager');
const TaskExecutorFactory = require('./TaskExecutorFactory');

const dataManager = require('../data/DataManager');

class TaskManager {
  constructor() {
  }

  static getTasksByUser(userId) {
    const tasks = [
      {
        id: "1",
        type: 'WebScrapper',
        name: 'Web Scraper Google',
        description: 'Checks Google every 3 minutes',
        userId: userId,
        cronExpression: '5,10 * * * * *',
        data: {
          url: 'http://www.google.com',
        },
        dateCreated: new Date(),
      },
    ];

    return tasks;
  }

  static getTaskById(taskId, userId) {
     return dataManager.getTasksById(taskId);
  }

  static async getAllTasks() {
    return dataManager.getAllTasks();
  }

  static init() {
    taskEventManager.on("taskCompleted", (task, response) => {
      console.log("Task execution completed: " + task.id);
    
      dataManager.updateTaskExecution(task.id, response);
    });

    TaskManager.scheduleAllTasks();
  }

  static async scheduleAllTasks() {
    const tasks = await TaskManager.getAllTasks();

    tasks.forEach(task => {
      scheduler.scheduleTask(TaskExecutorFactory.createTaskExecutor(task));
    });
  }

  static addUserTask(userId, task) {}
}

module.exports = TaskManager;
