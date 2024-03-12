const WebScrapper = require("./tasksExecutors/webScraper");
const RandomImage = require("./tasksExecutors/randomImage");

function createTaskExecutor(task) {
  let taskExecutor;

  switch (task.type) {
    case "WebScraper":
      taskExecutor = new WebScrapper(
        task.id,
        task.cronExpression,
        task.data.url
      );
      break;
    case "RandomImage":
      taskExecutor = new RandomImage(
        task.id,
        task.cronExpression
      );
      break;
    default:
      break;
  }

  return taskExecutor;
}

module.exports = {
  createTaskExecutor: createTaskExecutor,
};
