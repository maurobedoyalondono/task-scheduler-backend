const express = require("express");
var bodyParser = require('body-parser')

const cors = require("cors");

const app = express();
app.use(bodyParser.json());

const API_PORT = 3000;
const API_VERSION = "v1";

const tasksApp = require("./src/apps/tasks");
const usersApp = require("./src/apps/users");

const CLIENT_SERVER = "http://localhost:4200";

const corsOptions = {
  origin: CLIENT_SERVER
};

app.use(cors(corsOptions));

app.use(`/api/${API_VERSION}/tasks`, tasksApp);
app.use(`/api/${API_VERSION}/users`, usersApp);

const TaskManager = require("./src/models/TaskManager");
TaskManager.init();

app.listen(API_PORT);
