var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: String,
  cpf: {type: String, unique: true},
  role: {type: String, default: 'CUSTOMER'}
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //     if (err) return cb(err);
  //     cb(null, isMatch);
  // });

  cb(null, candidatePassword === this.password);

};

module.exports = mongoose.model('User', userSchema)
