var express = require('express');
var router = express.Router();
var User = require('../models/user');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var htmlToText = require('nodemailer-html-to-text').htmlToText;


var transporter = nodemailer.createTransport(smtpTransport({
  host: 'localhost',
  port: 25,
  // auth: {
  //   user: lennonjesus,
  //   pass: pass
  // },
  tls:{
    rejectUnauthorized: false
  }
}));

transporter.use('compile', htmlToText());

router.post('/', function(req, res) {

  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      return res.send(err);
    }

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: '"Clube Linkar" <no-reply@clubelinkar.com.br>',
      to: user.email,
      subject: 'Boas vindas ao Linkar!',
      html: '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><style type="text/css">body{font-family:Verdana, Geneva, sans-serif; text-align:center;}.container{height:auto; max-width:600px; margin:auto; padding:20px; background:#edecec;}.blocText{height:auto; width:100%; margin:auto;}.arredBd{border-radius: 10px;}.CorVerde{color:#00a292;}.CorVerdeBkd{background:#00a292;}.CorCoral{color:#f68d30;}.CorBranca{color:#ffffff;}.EspacoPdd15{padding:15px 0px 15px 0px;}.EspacoPdd25{padding:25px 0px 25px 0px;}.TarjaFina{background:#00a292; width:100%; padding: 10px 0px 10px 0px;}.TxtMin{font-size:10px;}.TxtMed{font-size:14px;}a:link{color:#FFF; text-decoration:none;}a:visited{color:#FFF; text-decoration:none;}a:active{color:#FFF; text-decoration:none;}a:hover{color:#FFF; text-decoration:none;}@media screen and (max-width: 350px){.container{height:auto; max-width:350px; margin:auto; padding:20px; background:#edecec;}}</style><title>Linkar - Boas Vindas!</title></head><body><div class="container arredBd"> <div class="blocText EspacoPdd25"><img src="http://clubelinkar.com.br/assets/images/logo_linkar.png"></div><div class="blocText CorVerde"><h3><strong>Boas vindas ao Linkar, <br>o Clube de Vantagens do Jornal Conecta Baixada.</strong></h3></div><div class="blocText CorCoral EspacoPdd25 TxtMed"> <p>A partir de agora você pode acumular pontos em nossos parceiros e trocar por diversos produtos, serviços e descontos.</p><p>Sempre que adquirir um produto ou serviço participante do programa, peça para pontuar no <strong>Linkar</strong>! </p><p>É simples, rápido, seguro e você fica cada vez mais perto de usufruir dos benefícios de nosso Clube de Vantagens. Estamos felizes em ter você conosco.</p><p>E, para celebrar o início de nosso relacionamento em grande estilo, creditamos 100 lkr à sua conta para te ajudar a começar sua carteira de pontos. </p><p>Esperamos que você curta nosso Clube de Vantagens tanto quanto curtimos selecionar parceiros, produtos e serviços para você.</p><p><strong>Um forte abraço,<br>Linkar - O Clube de Vantagens do Conecta Baixada.</strong></p></div><div class="blocText CorVerdeBkd EspacoPdd15 CorBranca arredBd"><a href="http://www.clubelinkar.com.br" target="_blank" title="Linkar - O Clube de Vantagens do Conecta Baixada">www.clubelinkar.com.br</a></div><div class="blocText TxtMin EspacoPdd25">Nós respeitamos a sua privacidade e a sua paciência. Não divulgamos seus dados e não enviamos spam.</div></div></body></html>'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }

      console.log('Message sent: ' + info.response);
    });

    res.json({data: 'Novo User cadastrado com sucesso.'});
  });

});

router.get('/', function(req, res) {

  if (req.query.name) {
    User.find({
      name: new RegExp(req.query.name, "i")
    }, {password: 0}, findUsersCallback);
  } else {
    User.find({}, {password: 0}, findUsersCallback);
  }

  function findUsersCallback(err, users) {
    if(err) {
      return res.send(err);
    }

    res.json(users);
  }

});

router.get('/:id', function(req, res) {

  User.findOne({_id: req.params.id}, function (err, user) {
    if(err) {
      return res.send(err);
    }

    res.json(user);
  });

});

router.put('/:id', function(req, res){

  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      user[prop] = req.body[prop];
    }

    user.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'User atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  User.remove({_id: req.params.id}, function(err, user) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'User deletado!' });
  });
});

router.post('/signup', function(req, res) {

  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({data: 'Novo User cadastrado com sucesso.'});
  });

});

module.exports = router;
