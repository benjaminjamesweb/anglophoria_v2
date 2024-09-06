const express = require('express');
const Router = express.Router();
const ThemeController = require('../controllers/theme');

// Route to get all available themes
Router.get('/themes', ThemeController.GetThemes);

// Route to set the user's selected theme
Router.post('/themes/select', ThemeController.SetUserTheme);

module.exports = Router;
