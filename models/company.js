var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SocialType = require('./social.type');

var CompanySchema = new Schema({
  name: {type: String, unique: true},
  description: String,
  categories: [String],

  social: {type: SocialType},

  address: String,
  phones: [String],
  site: {type: String, unique: true},

  // isso vai virar User
  login: {type: String, unique: true},
  email: {type: String, unique: true},
  password: {type: String},
  cnpj: {type: String, unique: true},
  role: {type: String, default: 'COMPANY'}
});

CompanySchema.methods.comparePassword = function(candidatePassword, cb) {
  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //     if (err) return cb(err);
  //     cb(null, isMatch);
  // });

  cb(null, candidatePassword === this.password);

};

module.exports = mongoose.model('Company', CompanySchema)
