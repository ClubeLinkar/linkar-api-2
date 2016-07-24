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

    var emailEmpresa = `
      <!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <style type="text/css">
        body{font-family:Verdana, Geneva, sans-serif; text-align:center;}
        .container{height:auto; max-width:600px; margin:auto; padding:20px; background:#edecec;}

        .blocText{height:auto; width:100%; margin:auto;}
        .arredBd{border-radius: 10px;}
        .CorVerde{color:#00a292;}
        .CorVerdeBkd{background:#00a292;}
        .CorCoral{color:#f68d30;}
        .CorBranca{color:#ffffff;}
        .EspacoPdd15{padding:15px 0px 15px 0px;}
        .EspacoPdd25{padding:25px 0px 25px 0px;}
        .TarjaFina{background:#00a292; width:100%; padding: 10px 0px 10px 0px;}
        .TxtMin{font-size:10px;}
        .TxtMed{font-size:14px;}

        a:link {color:#FFF; text-decoration:none;}
        a:visited {color:#FFF; text-decoration:none;}
        a:active {color:#FFF; text-decoration:none;}
        a:hover {color:#FFF; text-decoration:none;}

        @media screen and (max-width: 350px){.container{height:auto; max-width:350px; margin:auto; padding:20px; background:#edecec;}}
      </style>
      <title>Linkar - Transação Efetivada!</title>
      </head>
      <body>
      <div class="container arredBd">
        <div class="blocText EspacoPdd25"><img src="https://clubelinkar.com.br/assets/images/logo_linkar.png"></div>
        <br/>
        <div class="blocText CorVerde"><h3><strong>Olá, ${transaction.companyName}!</strong></h3></div>
        <div class="blocText CorVerde EspacoPdd25 TxtMed">
          <p>Parabéns!</p>
          <p>Você acabou de vender ${transaction.productQuantity} unidades de <b>${transaction.productName}</b> no valor unitário de <b>R$ ${transaction.productUnitPrice}</b>;
            <br/>Continue acompanhando seu desempenho de vendas pelo seu dashboard e sucesso!
          </p>
          <br/>
          <p>
            <strong>Um forte abraço,<br>
              Linkar - O Clube de Vantagens do Conecta Baixada.</strong>
            </p>
          </div>
          <div class="blocText CorVerdeBkd EspacoPdd15 CorBranca arredBd"><a href="https://www.clubelinkar.com.br" target="_blank" title="Linkar - O Clube de Vantagens do Conecta Baixada">www.clubelinkar.com.br</a></div>
          <div class="blocText TxtMin EspacoPdd25">Nós respeitamos a sua privacidade e a sua paciência. Não divulgamos seus dados e não enviamos spam.</div>
        </div>
      </body>
      </html>`;

    var from_email = new helper.Email('clubelinkar@clubelinkar.com.br');
    // var to_email = new helper.Email(transaction.customerEmail);
    var to_email = new helper.Email(transaction.creatorEmail);
    var subject = "Transação Efetivada!";
    var content = new helper.Content("text/html", emailEmpresa);
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

    var emailCliente = `
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
    body{font-family:Verdana, Geneva, sans-serif; text-align:center;}
      .container{height:auto; max-width:600px; margin:auto; padding:20px; background:#edecec;}

      .blocText{height:auto; width:100%; margin:auto;}
      .arredBd{border-radius: 10px;}
      .CorVerde{color:#00a292;}
      .CorVerdeBkd{background:#00a292;}
      .CorCoral{color:#f68d30;}
      .CorBranca{color:#ffffff;}
      .EspacoPdd15{padding:15px 0px 15px 0px;}
      .EspacoPdd25{padding:25px 0px 25px 0px;}
      .TarjaFina{background:#00a292; width:100%; padding: 10px 0px 10px 0px;}
      .TxtMin{font-size:10px;}
      .TxtMed{font-size:14px;}

      a:link {color:#FFF; text-decoration:none;}
      a:visited {color:#FFF; text-decoration:none;}
      a:active {color:#FFF; text-decoration:none;}
      a:hover {color:#FFF; text-decoration:none;}

      @media screen and (max-width: 350px){.container{height:auto; max-width:350px; margin:auto; padding:20px; background:#edecec;}}
    </style>
    <title>Linkar - Boas Vindas!</title>
    </head>
    <body>
    <div class="container arredBd">
      <div class="blocText EspacoPdd25"><img src="https://clubelinkar.com.br/assets/images/logo_linkar.png"></div>
      <div class="blocText CorCoral"><br/><h3><strong>Olá, ${transaction.customerName}!</strong></h3></div>
      <div class="blocText CorCoral EspacoPdd25 TxtMed">
        <p>Parabéns!</p>
        <p>Você acabou de comprar <b>${transaction.productName}</b> na empresa <br /> <b>${transaction.companyName}</b>. </p>
        <p>Nessa compra você acumulou <b>LKR$ ${transaction.amount}</b> para trocar por ofertas em qualquer produto exposto na loja Clube Linkar.</p>
        <!-- <p><b>(No futuro)</b> Você pode acompanhar todo seu histórico<br/> de transação na área de usuário.</p> -->
        <br/>
        <p><strong>Um forte abraço,<br>
          Linkar - O Clube de Vantagens do Conecta Baixada.</strong></p>
        </div>
        <div class="blocText CorVerdeBkd EspacoPdd15 CorBranca arredBd"><a href="https://www.clubelinkar.com.br" target="_blank" title="Linkar - O Clube de Vantagens do Conecta Baixada">www.clubelinkar.com.br</a></div>
        <div class="blocText TxtMin EspacoPdd25">Nós respeitamos a sua privacidade e a sua paciência. Não divulgamos seus dados e não enviamos spam.</div>
      </div>
    </body>
    </html>
    `;

    // var to_email = new helper.Email(transaction.customerEmail);
    to_email = new helper.Email(transaction.customerEmail);
    content = new helper.Content("text/html", emailCliente);

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
