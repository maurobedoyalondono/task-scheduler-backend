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
    this.#tasksDataStore = new Datastore({ filename: "./database/files/tasks" });
    this.#tasksDataStore.load();

    this.#usersDataStore = new Datastore({ filename: "./database/files/users" });
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

  getUserById(userId) {
    return new Promise((resolve, reject) => {
      this.#usersDataStore.findOne({ _id: userId }, function (err, user) {
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

  createTask(task) {
    return new Promise((resolve, reject) => {
      this.#tasksDataStore.insert(task, function (err, newTask) {
        if (err) {
          reject(err);
        } else {
          resolve(newTask);
        }
      });
    });
  }

  getTasksById(taskId) {
    return new Promise((resolve, reject) => {
      this.#tasksDataStore.findOne({ _id: taskId }, function (err, docs) {
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
      this.#tasksDataStore.update({ _id: taskId }, {
        $set: {
          executionData: { lastExecutionDate: new Date(), details: executionDetails }
        }
      }, { upsert: false }, function (err, numReplaced) {
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