var express = require('express');
var router = express.Router();
var passport = require('passport');


router.post('/', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.

  console.log(req.user.username);

  res.redirect('/todos');
});

router.get('/', function(req, res) {
  if (req.user) {
    res.status(200).send({loggedUser: req.user});
  } else {
    res.status(401).send({error: "No user."});
  }
});


module.exports = router;
