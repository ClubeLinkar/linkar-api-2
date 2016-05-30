var express = require('express');
var router = express.Router();
var Category = require('../models/category');

router.post('/', function(req, res) {

  var category = new Category(req.body);

    category.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({data: 'Novo Category cadastrado com sucesso.'});
    });

});

router.get('/', function(req, res) {

  Category.find(function (err, categorys) {
    if(err) {
      return res.send(err);
    }

    res.json(categorys);
  });

});

router.get('/:id', function(req, res) {

  Category.findOne({_id: req.params.id}, function (err, category) {
    if(err) {
      return res.send(err);
    }

    res.json(category);
  });

});

router.put('/:id', function(req, res){

  Category.findOne({ _id: req.params.id }, function(err, category) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      category[prop] = req.body[prop];
    }

    category.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Category atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  Category.remove({_id: req.params.id}, function(err, category) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Category deletado!' });
  });
});

module.exports = router;
