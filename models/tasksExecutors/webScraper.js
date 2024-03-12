const axios = require("axios");

class WebScrapper {
  constructor(id, cronExpression, url) {
    this.id = id;
    this.cronExpression = cronExpression;
    this.url = url;
  }

  async execute() {
    try {
      const response = await axios.get(this.url);

      return response.headers;
    } catch (error) {
      console.error(`Error fetching ${this.url}:`, error.message);
    }
  }
}

module.exports = WebScrapper;
