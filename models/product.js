var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  companyId: String, //TODO substituir por ref???
  categories: [String]
});

module.exports = mongoose.model('Product', productSchema)
