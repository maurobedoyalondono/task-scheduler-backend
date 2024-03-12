const express = require("express");
const usersApp = express();

const UserManager = require('../models/UserManager');

usersApp.get("/:email", (req, res) => {
  const user = {
    id: 1
  };

  res.json(user);
});

usersApp.post(`/`, async (req, res) => {
  const email = req.body.email;

  try {
    const registeredUser = await UserManager.getUserByEmail(email);

    if (registeredUser) {
      return res.status(200).json(registeredUser);
    }

    const newUser = {
      email: email,
      dateCreated: new Date()
    };

    const user = await UserManager.createUser(newUser);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = usersApp;
