var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: {type: String},
  cpf: {type: String, unique: true},
  facebook: {
    id: {type: String},
    token: {type: String},
    name: {type: String},
    email: {type: String}
  },
  role: {type: String, default: 'CUSTOMER'},
  createdAt: {type: Date, default: Date.now}
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //     if (err) return cb(err);
  //     cb(null, isMatch);
  // });

  // bcrypt.compare(candidatePassword, this.password, function(err, res) {
  //   cb(null, res);
  // });

  cb(null, candidatePassword === this.password);

};

module.exports = mongoose.model('User', UserSchema)
