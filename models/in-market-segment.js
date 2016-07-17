var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InMarketSegmentSchema = new Schema({
  name: {type: String, unique: true, required: true}
});

module.exports = mongoose.model('InMarketSegment', InMarketSegmentSchema)
