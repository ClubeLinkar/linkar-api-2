var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: String,
  description: String,
  cnpj: {type: String, unique: true},
  categories: [String],

  // isso vai virar User
  email: {type: String, unique: true},
  password: String,
  cnpj: {type: String, unique: true},
  role: {type: String, default: 'COMPANY'}
});

module.exports = mongoose.model('Company', companySchema)
