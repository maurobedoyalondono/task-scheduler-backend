const dataManager = require('../data/DataManager');

class UserManager {
  constructor() {
  }

  static createUser(email) {
     return dataManager.createUser(email);
  }

  static getUserByEmail(email) {
    return dataManager.getUserByEmail(email);
 }
}

module.exports = UserManager;
