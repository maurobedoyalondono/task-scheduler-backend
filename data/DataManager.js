var Datastore = require("nestdb");

let dataManagerInstance;

class DataManager {
  #tasksDataStore;
  #usersDataStore;

  constructor() {
    if (!dataManagerInstance) {
      dataManagerInstance = this;
      this.init();
    }
  }

  getInstance() {
    return dataManagerInstance;
  }

  init() {
    this.#tasksDataStore = new Datastore({ filename: "./data/tasks" });
    this.#tasksDataStore.load();

    this.#usersDataStore = new Datastore({ filename: "./data/users" });
    this.#usersDataStore.load();
  }

  getTasksDatastore() {
    return this.#tasksDataStore;
  }

  getTasksDatastore() {
    return this.#usersDataStore;
  }

  createUser(user) {
    return new Promise((resolve, reject) => {
      this.#usersDataStore.insert(user, function (err, newUser) {
        if (err) {
          reject(err);
        } else {
          resolve(newUser);
        }
      });
    });
  }

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      this.#usersDataStore.findOne({ email: email }, function (err, user) {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }

  getAllTasks() {
    return new Promise((resolve, reject) => {
      this.#tasksDataStore.find({}, function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  getTasksById(taskId) {
    return new Promise((resolve, reject) => {
      this.#tasksDataStore.findOne({ id: taskId }, function (err, docs) {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }

  updateTaskExecution(taskId, executionDetails) {
    return new Promise((resolve, reject) => {
      this.#tasksDataStore.update({ id: taskId }, {
        $set: {
          executionData: { lastExecutionDate: new Date(), details: executionDetails }
        }
      }, {}, function (err, numReplaced) {
        if (err) {
          reject(err);
        } else {
          resolve(numReplaced);
        }
      });
    });
  }
}

dataManagerInstance = new DataManager().getInstance();

module.exports = dataManagerInstance;