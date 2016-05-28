var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

module.exports = function (app) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {

      var errors = [];

      if (username !== 'lennon') {
        console.log('Invalid username.');
        errors.push('Invalid username.');
      }

      if (password !== '1234') {
        console.log('Invalid password.');
        errors.push('Invalid password.');
      }

      if(errors.length === 0) {
        console.log('Authentication success.');
        return done(null, {username: username, password: password});
      } else {
        console.log('Authentication failure.');
        return done(null, false, {erros: errors});
      }
    }
  ));

};
