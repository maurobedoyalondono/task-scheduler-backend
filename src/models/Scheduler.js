var cron = require("node-cron");

const TaskEventManager = require('./TaskEventManager');

function scheduleTask(task) {
  cron.schedule(task.cronExpression, () => {
    executeTask(task);
  });
}

async function executeTask(task) {
    const response = await task.execute();

    TaskEventManager.emit('taskCompleted', task, response);
}

module.exports = {
  scheduleTask: scheduleTask
};
