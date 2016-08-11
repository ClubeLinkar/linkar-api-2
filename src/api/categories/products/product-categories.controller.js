var express = require('express');
var router = express.Router();
var ProductCategory = require('./product-category');

router.post('/', function(req, res) {

  var category = new ProductCategory(req.body);

    category.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({data: 'Novo ProductCategory cadastrado com sucesso.'});
    });

});

router.get('/', function(req, res) {

  ProductCategory.find(function (err, categories) {
    if(err) {
      return res.send(err);
    }

    res.json(categories);
  });

});

router.get('/:id', function(req, res) {

  ProductCategory.findOne({_id: req.params.id}, function (err, category) {
    if(err) {
      return res.send(err);
    }

    res.json(category);
  });

});

router.put('/:id', function(req, res){

  ProductCategory.findOne({ _id: req.params.id }, function(err, category) {
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

      res.json({ message: 'ProductCategory atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  ProductCategory.remove({_id: req.params.id}, function(err, category) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'ProductCategory deletado!' });
  });
});

module.exports = router;
