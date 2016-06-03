var express = require('express');
var router = express.Router();
var passport = require('passport');


router.post('/user', passport.authenticate('user-auth'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.status(200).send({loggedUser: req.user});
});

router.get('/facebook', passport.authenticate('facebook'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.status(200).send({loggedUser: req.user});
});

router.post('/company', passport.authenticate('company-auth'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.status(200).send({loggedUser: req.user});
});

router.get('/', function(req, res) {
  if (req.user) {
    res.status(200).send({loggedUser: req.user});
  } else {
    res.status(401).send({error: "No user."});
  }
});


module.exports = router;
