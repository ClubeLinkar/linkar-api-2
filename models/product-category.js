var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductCategorySchema = new Schema({
  name: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('ProductCategory', ProductCategorySchema)
