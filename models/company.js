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

companySchema.methods.comparePassword = function(candidatePassword, cb) {
  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //     if (err) return cb(err);
  //     cb(null, isMatch);
  // });

  cb(null, candidatePassword === this.password);

};

module.exports = mongoose.model('Company', companySchema)
