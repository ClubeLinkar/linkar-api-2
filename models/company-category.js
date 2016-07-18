var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompanyCategorySchema = new Schema({
  name: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('CompanyCategory', CompanyCategorySchema)
