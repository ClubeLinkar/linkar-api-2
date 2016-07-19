var express = require('express');
var router = express.Router();
var Transaction = require('../models/transaction');

var sg = require('sendgrid').SendGrid("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");
var helper = require('sendgrid').mail;

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


    var email = `<!DOCTYPE html><head></head><body>
    Obrigado por Linkar!
    <br />
    Produto: ${transaction.productName}
    <br />
    Preço unitário: ${transaction.productUnitPrice}
    <br />
    Quantidade: ${transaction.productQuantity}
    <br />
    Total da compra: ${transaction.amount}
    <br />
    Cliente: ${transaction.customerName}
    <br />
    Loja: ${transaction.companyName}
    <br />
    </body></html>`;

    var from_email = new helper.Email('clubelinkar@clubelinkar.com.br');
    // var to_email = new helper.Email(transaction.customerEmail);
    var to_email = new helper.Email('lennon.jesus+customer@gmail.com');
    var subject = "Transação Efetivada!";
    var content = new helper.Content("text/html", email);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var requestBody = mail.toJSON();
    var request = sg.emptyRequest();

    request.method = 'POST';
    request.path = '/v3/mail/send';
    request.body = requestBody;

    sg.API(request, function (response) {
      console.log("Envio de e-mail");
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });


    // ===========


    // var to_email = new helper.Email(transaction.customerEmail);
    to_email = new helper.Email('lennon.jesus+company@gmail.com');


    mail = new helper.Mail(from_email, subject, to_email, content);
    requestBody = mail.toJSON();
    request = sg.emptyRequest();

    request.method = 'POST';
    request.path = '/v3/mail/send';
    request.body = requestBody;

    sg.API(request, function (response) {
      console.log("Envio de e-mail");
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });




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
