var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

router.post('/', function(req, res) {

  var todo = new Todo(req.body);

    todo.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({data: 'Novo Todo cadastrado com sucesso.'});
    });

});

router.get('/', function(req, res) {

  Todo.find(function (err, todos) {
    if(err) {
      return res.send(err);
    }

    res.json(todos);
  });

});

router.get('/:id', function(req, res) {

  Todo.findOne({_id: req.params.id}, function (err, todo) {
    if(err) {
      return res.send(err);
    }

    res.json(todo);
  });

});

router.put('/:id', function(req, res){

  Todo.findOne({ _id: req.params.id }, function(err, todo) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      todo[prop] = req.body[prop];
    }

    todo.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Todo atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  Todo.remove({_id: req.params.id}, function(err, todo) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Todo deletado!' });
  });
});

module.exports = router;
