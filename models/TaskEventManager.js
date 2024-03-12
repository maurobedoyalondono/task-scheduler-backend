const EventEmitter = require("node:events");

let instance;

class TaskEventManager extends EventEmitter {
  constructor() {
    super();

    if (!instance) {
      instance = this;
    }
  }

  getInstance() {
    return instance;
  }
}

instance = new TaskEventManager().getInstance();

module.exports = instance;
