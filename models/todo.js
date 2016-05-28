var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  title: String,
  archived: Boolean
});

module.exports = mongoose.model('Todo', todoSchema)
