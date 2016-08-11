var express = require('express');
var router = express.Router();
var Product = require('./product');

router.post('/', function(req, res) {

  var product = new Product(req.body);

  if (req.user.role === 'COMPANY') {
    product.companyId = req.user._id;
  }

  product.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({data: 'Novo Product cadastrado com sucesso.'});
  });

});

router.get('/', function(req, res) {

  var loggedUser = req.user;

  if (!loggedUser) {
    res.json({error: "Autenticação requerida."})
  } else if (loggedUser.role === 'ADMIN'){
    Product.find(searchProducts);
  } else {
    Product.find({companyId: req.user._id}, searchProducts);
  }

  function searchProducts(err, products) {
    if(err) {
      return res.send(err);
    }

    res.json(products);
  }

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
