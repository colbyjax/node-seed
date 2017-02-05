var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  summary: String
});

mongoose.model('Book', bookSchema);