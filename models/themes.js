const mongoose = require("mongoose");

const ThemeSchema = new mongoose.Schema({
  themeName: {
    type: String,
    required: true, 
  },
  colors: {
    type: [String],  
  }
}, {
    timestamps: true
});

const ThemeModel = mongoose.model('Theme', ThemeSchema);

module.exports = ThemeModel;
