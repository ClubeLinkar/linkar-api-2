var Product = require('./product');

var ProductController = {
  list: list,
  getById: getById,
  create: create,
  update: update,
  remove: remove
};

function list(req, res) {

  var loggedUser = req.user;

  if (!loggedUser) {
    res.json({error: "Autenticação requerida."});
  } else if (loggedUser.role === 'ADMIN') {
    Product.find({}, searchProducts);
  } else {
    Product.find({companyId: req.user._id}, searchProducts);
  }

  function searchProducts(err, products) {
    if(err) {
      return res.send(err);
    }
    res.json(products);
  }

}

function getById(req, res) {

  Product.findOne({_id: req.params.id}, function (err, product) {
    if(err) {
      return res.send(err);
    }

    res.json(product);
  });

}

function create(req, res) {

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

}

function update(req, res) {

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
}

function remove(req, res) {

  Product.remove({_id: req.params.id}, function(err, product) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Product deletado!' });
  });
}

module.exports = ProductController;
