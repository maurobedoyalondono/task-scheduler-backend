const dataManager = require("../data/DataManager");

class UserManager {
  constructor() {}

  static createUser(email) {
    return dataManager.createUser(email);
  }

  static getUserByEmail(email) {
    return dataManager.getUserByEmail(email);
  }

  static getUserById(userId) {
    return dataManager.getUserById(userId);
  }
}

module.exports = UserManager;
