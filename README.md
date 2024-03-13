# Task Scheduler API

## Install Server

Run `npm install`

## Run Server

Run `node app.js`.

It will run by default on port '3000', it can be updated on app.js

## Additional Steps

- Since the server will be scraping, it is necessary that the server can connect to the web, otherwise API calls from Client will fail
- It is the assumption that the server will be used by a local server (http://localhost:4200 - Angular), there is a variable named "CLIENT_SERVER" on app.js which allows the execution from it.

## Database

This application uses a local json database (nestdb), it contains the files: database/files/tasks and database/files/users. This is not a DB to be used in a real application, be aware of it.
Some sample data has been left in the database, you can add these files to "gitignore" and the application will create them again if not found.

## Task Execution Logs

NestDB database works in a way that all changes to objects remain in the database file, so it can be used if it is necessary to check when a task is executed

## API Resources

The server has 2 resources only:
- tasks: This is needs to receive a Header "User-Id" otherwise calls will fail with a 503 error
- users