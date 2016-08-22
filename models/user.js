var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthProviderType = require('./auth-provider.type');

var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: {type: String},
  cpf: {type: String, unique: true},

  providers: [AuthProviderType],

  role: {type: String, default: 'CUSTOMER'},
  createdAt: {type: Date, default: Date.now}
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //     if (err) return cb(err);
  //     cb(null, isMatch);
  // });

  // console.log("comparing pass");
  //
  // console.log(candidatePassword);
  //
  // console.log(this.password);

  // bcrypt.compare(candidatePassword, this.password, function(err, res) {
  //
  //   console.log("user.js::err=" + err);
  //
  //   console.log("user.js::res=" + res);
  //
  //   if(err) return cb(err);
  //
  //   cb(null, res);
  // });

  // cb(null, candidatePassword === this.password);

  // bcrypt.genSalt(10, function(err, salt) {
  //   bcrypt.hash(candidatePassword, salt, function(err, hash) {
  //     console.log(hash);
  //   });
  // });

  var isValid = bcrypt.compareSync(candidatePassword, this.password);

  cb(null, isValid);

};

module.exports = mongoose.model('User', UserSchema)
