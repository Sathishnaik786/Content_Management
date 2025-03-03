const express = require("express");
const Usersrouter = express.Router();
const { register, login } = require("../controllers/userController");

Usersrouter.post("/register", register);
Usersrouter.post("/login", login);

module.exports = Usersrouter;
