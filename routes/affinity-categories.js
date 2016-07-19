var express = require('express');
var router = express.Router();
var AffinityCategory = require('../models/affinity-category');

router.post('/', function(req, res) {

  var category = new AffinityCategory(req.body);

    category.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({data: 'Novo AffinityCategory cadastrado com sucesso.'});
    });

});

router.get('/', function(req, res) {

  AffinityCategory.find(function (err, categories) {
    if(err) {
      return res.send(err);
    }

    res.json(categories);
  });

});

router.get('/:id', function(req, res) {

  AffinityCategory.findOne({_id: req.params.id}, function (err, category) {
    if(err) {
      return res.send(err);
    }

    res.json(category);
  });

});

router.put('/:id', function(req, res){

  AffinityCategory.findOne({ _id: req.params.id }, function(err, category) {
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

      res.json({ message: 'AffinityCategory atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  AffinityCategory.remove({_id: req.params.id}, function(err, category) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Category deletado!' });
  });
});

module.exports = router;
