var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AffinityCategorySchema = new Schema({
  name: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('AffinityCategory', AffinityCategorySchema)
