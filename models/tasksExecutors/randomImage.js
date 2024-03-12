const axios = require("axios");

class RandomImage {
  #imageServiceFormat = "https://picsum.photos/id/@id/80/80";

  constructor(id, cronExpression) {
    this.id = id;
    this.cronExpression = cronExpression;
  }

  #generateRandomInteger() {
    const MAX_NUMBER = 500;

    return Math.floor(Math.random() * MAX_NUMBER) + 1;
  }

  async execute() {
    try {
      const imageURL = this.#imageServiceFormat.replace('@id',this.#generateRandomInteger());      

      return imageURL;
    } catch (error) {
      console.error("Error fetching from picsum: " + error.message);
    }
  }
}

module.exports = RandomImage;
