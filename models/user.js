var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: String,
  cpf: {type: String, unique: true},
  role: {type: String, default: 'CUSTOMER'}
});

module.exports = mongoose.model('User', userSchema)
