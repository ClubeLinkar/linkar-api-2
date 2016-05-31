var express = require('express');
var router = express.Router();
var Transaction = require('../models/transaction');

router.post('/', function(req, res) {

  var transaction = new Transaction(req.body);

  transaction.creatorId = req.user._id;
  transaction.creatorName = req.user.name;
  transaction.creatorEmail = req.user.email;

  transaction.companyName = req.user.name;

  transaction.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({data: 'Novo Transaction cadastrado com sucesso.'});
  });

});

router.get('/', function(req, res) {

  var filter = req.user.role === 'COMPANY' ? {
    creatorId: req.user._id
  } : {
    customerId: req.user._id
  }

  Transaction.find(filter, function (err, transactions) {
    if(err) {
      return res.send(err);
    }

    res.json(transactions);
  });

});

router.get('/:id', function(req, res) {

  Transaction.findOne({_id: req.params.id}, function (err, transaction) {
    if(err) {
      return res.send(err);
    }

    res.json(transaction);
  });

});

router.put('/:id', function(req, res){

  Transaction.findOne({ _id: req.params.id }, function(err, transaction) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      transaction[prop] = req.body[prop];
    }

    transaction.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Transaction atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  Transaction.remove({_id: req.params.id}, function(err, transaction) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Transaction deletado!' });
  });
});

module.exports = router;
