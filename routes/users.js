var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req, res) {

  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({data: 'Novo User cadastrado com sucesso.'});
  });

});

router.get('/', function(req, res) {

  if (req.query.name) {
    User.find({
      name: new RegExp(req.query.name, "i")
    }, findUsersCallback);
  } else {
    User.find(findUsersCallback);
  }

  function findUsersCallback(err, users) {
    if(err) {
      return res.send(err);
    }

    res.json(users);
  }

});

router.get('/:id', function(req, res) {

  User.findOne({_id: req.params.id}, function (err, user) {
    if(err) {
      return res.send(err);
    }

    res.json(user);
  });

});

router.put('/:id', function(req, res){

  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      user[prop] = req.body[prop];
    }

    user.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'User atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  User.remove({_id: req.params.id}, function(err, user) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'User deletado!' });
  });
});

router.post('/signup', function(req, res) {

  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({data: 'Novo User cadastrado com sucesso.'});
  });

});

module.exports = router;
