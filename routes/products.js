var express = require('express');
var router = express.Router();
var Product = require('../models/product');

router.post('/', function(req, res) {

  var product = new Product(req.body);

    product.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({data: 'Novo Product cadastrado com sucesso.'});
    });

});

router.get('/', function(req, res) {

  Product.find({
    companyId: req.user._id
  }, function (err, products) {
    if(err) {
      return res.send(err);
    }

    res.json(products);
  });

});

router.get('/:id', function(req, res) {

  Product.findOne({_id: req.params.id}, function (err, product) {
    if(err) {
      return res.send(err);
    }

    res.json(product);
  });

});

router.put('/:id', function(req, res){

  Product.findOne({ _id: req.params.id }, function(err, product) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      product[prop] = req.body[prop];
    }

    product.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Product atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  Product.remove({_id: req.params.id}, function(err, product) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Product deletado!' });
  });
});

module.exports = router;
