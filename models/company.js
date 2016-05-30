var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: String,
  description: String,
  cnpj: {type: String, unique: true},
  categories: [String]
});

module.exports = mongoose.model('Company', companySchema)
