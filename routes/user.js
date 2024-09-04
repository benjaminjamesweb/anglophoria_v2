const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/user');

// Define routes
Router.post('/signup', UserController.RegisterUser);
Router.post('/login', UserController.LoginUser);
Router.get('/', UserController.GetUsers); // Ensure GetUsers is defined

module.exports = Router;
