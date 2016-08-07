var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SocialType = require('./social.type');
var TargetAudienceType = require('./target-audience.type');

var shortid = require('shortid');

var bcrypt = require('bcryptjs');

var CompanySchema = new Schema({
  name: {type: String, unique: true, required: true},
  description: String,
  categories: [String],

  social: {type: SocialType},

  address: String,
  phones: [String],
  site: {type: String},

  targetAudience: {type: TargetAudienceType},

  identifier: {
    type: String,
    default: shortid.generate
  },

  contractAgreement: {
    url: {type: String},
    isAccepted: {type: Boolean, default: false},
    date: {type: Date}
  },

  // isso vai virar User
  login: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  cnpj: {type: String, unique: true, required: true},
  role: {type: String, default: 'COMPANY'}
});

CompanySchema.methods.comparePassword = function(candidatePassword, cb) {

  var isValid = bcrypt.compareSync(candidatePassword, this.password);

  cb(null, isValid);

};

CompanySchema.pre('save', function(next) {
  this.contractAgreement.date = this.contractAgreement.isAccepted ? Date.now() : null;
  next();
});

module.exports = mongoose.model('Company', CompanySchema)
