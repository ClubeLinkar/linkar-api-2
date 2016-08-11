var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../api/users/user');
    Company = require('../api/companies/company');

module.exports = function (app) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use('user-auth', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function(email, password, done) {

      User.findOne({email: email}, function (err, user) {

        if (err) { return done(err); }

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        user.comparePassword(password, function (err, isValid) {
          if (err) throw err;

          if (!isValid) return done(null, false, { message: 'Incorrect password.' });
        });

        return done(null, user);
      });

    }
  ));

  passport.use('company-auth', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function(email, password, done) {

      Company.findOne({email: email}, function (err, user) {

        if (err) { return done(err); }

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        user.comparePassword(password, function (err, isValid) {
          if (err) throw err;

          if (!isValid) return done(null, false, { message: 'Incorrect password.' });
        });

        return done(null, user);
      });

    }
  ));

passport.use(new FacebookStrategy({

  clientID        : '266011427085983',
  clientSecret    : 'adbe2d1d21e7d39edb1bbe661163823e',
  callbackURL     : 'http://localhost:3000/linkar/api/auth/facebook/callback',
  passReqToCallback : true, // allows us to pass in the req from our route (lets us check if a user is logged in or not)
  profileFields: ['id', 'emails', 'name']

},
function(req, token, refreshToken, profile, done) {

  // asynchronous
  process.nextTick(function() {

    // check if the user is already logged in
    if (!req.user) {

      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        if (err)
        return done(err);

        if (user) {

          // if there is a user id already but no token (user was linked at one point and then removed)
          if (!user.facebook.token) {
            user.facebook.token = token;
            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
            user.facebook.email = profile.emails[0].value;

            user.save(function(err) {
              if (err)
              throw err;
              return done(null, user);
            });
          }

          return done(null, user); // user found, return that user
        } else {
          // if there is no user, create them
          var newUser            = new User();

          newUser.facebook.id    = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = profile.emails[0].value;

          newUser.save(function(err) {
            if (err)
            throw err;
            return done(null, newUser);
          });
        }
      });

    } else {
      // user already exists and is logged in, we have to link accounts
      var user            = req.user; // pull the user out of the session

      user.facebook.id    = profile.id;
      user.facebook.token = token;
      user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
      user.facebook.email = profile.emails[0].value;

      user.save(function(err) {
        if (err)
        throw err;
        return done(null, user);
      });

    }
  });

}));

};
//
// exports.ensureAuthenicated = function(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//
//   res.redirect('/login')
// }
