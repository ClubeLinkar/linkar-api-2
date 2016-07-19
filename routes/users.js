var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcryptjs');

var sg = require('sendgrid').SendGrid("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");
var helper = require('sendgrid').mail;

router.post('/', function(req, res) {

  var user = new User(req.body);

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {

      user.password = hash;

      user.save(function(err) {
        if (err) {
          return res.send(err);
        }

        var from_email = new helper.Email('cadastro@clubelinkar.com.br');
        var to_email = new helper.Email(user.email);
        var subject = "Boas vindas ao Linkar!";
        var content = new helper.Content("text/html", '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><style type="text/css">body{font-family:Verdana, Geneva, sans-serif; text-align:center;}.container{height:auto; max-width:600px; margin:auto; padding:20px; background:#edecec;}.blocText{height:auto; width:100%; margin:auto;}.arredBd{border-radius: 10px;}.CorVerde{color:#00a292;}.CorVerdeBkd{background:#00a292;}.CorCoral{color:#f68d30;}.CorBranca{color:#ffffff;}.EspacoPdd15{padding:15px 0px 15px 0px;}.EspacoPdd25{padding:25px 0px 25px 0px;}.TarjaFina{background:#00a292; width:100%; padding: 10px 0px 10px 0px;}.TxtMin{font-size:10px;}.TxtMed{font-size:14px;}a:link{color:#FFF; text-decoration:none;}a:visited{color:#FFF; text-decoration:none;}a:active{color:#FFF; text-decoration:none;}a:hover{color:#FFF; text-decoration:none;}@media screen and (max-width: 350px){.container{height:auto; max-width:350px; margin:auto; padding:20px; background:#edecec;}}</style><title>Linkar - Boas Vindas!</title></head><body><div class="container arredBd"> <div class="blocText EspacoPdd25"><img src="http://clubelinkar.com.br/assets/images/logo_linkar.png"></div><div class="blocText CorVerde"><h3><strong>Boas vindas ao Linkar, <br>o Clube de Vantagens do Jornal Conecta Baixada.</strong></h3></div><div class="blocText CorCoral EspacoPdd25 TxtMed"> <p>A partir de agora você pode acumular pontos em nossos parceiros e trocar por diversos produtos, serviços e descontos.</p><p>Sempre que adquirir um produto ou serviço participante do programa, peça para pontuar no <strong>Linkar</strong>! </p><p>É simples, rápido, seguro e você fica cada vez mais perto de usufruir dos benefícios de nosso Clube de Vantagens. Estamos felizes em ter você conosco.</p><p>E, para celebrar o início de nosso relacionamento em grande estilo, creditamos 100 lkr à sua conta para te ajudar a começar sua carteira de pontos. </p><p>Esperamos que você curta nosso Clube de Vantagens tanto quanto curtimos selecionar parceiros, produtos e serviços para você.</p><p><strong>Um forte abraço,<br>Linkar - O Clube de Vantagens do Conecta Baixada.</strong></p></div><div class="blocText CorVerdeBkd EspacoPdd15 CorBranca arredBd"><a href="http://www.clubelinkar.com.br" target="_blank" title="Linkar - O Clube de Vantagens do Conecta Baixada">www.clubelinkar.com.br</a></div><div class="blocText TxtMin EspacoPdd25">Nós respeitamos a sua privacidade e a sua paciência. Não divulgamos seus dados e não enviamos spam.</div></div></body></html>');
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

        res.json({data: 'Novo User cadastrado com sucesso.'});
      });

    });
  });

});

router.get('/', function(req, res) {

  if (!req.user) {
    res.json({error: "Autenticação requerida."})
  } else {

    var ommitedFields = {password: 0, cpf: 0};

    if (req.query.name) {
      User.find({name: new RegExp(req.query.name, "i")}, ommitedFields, findUsersCallback);
    } else if (req.query.emailOrCpf) {
      User.find({$or : [{cpf: req.query.emailOrCpf}, {email: req.query.emailOrCpf}]}, ommitedFields, findUsersCallback);
    } else {
      User.find({}, ommitedFields, findUsersCallback);
    }

    function findUsersCallback(err, users) {
      if(err) {
        return res.send(err);
      }

      if (users.length > 0){
        res.json(users);
      } else {
        res.status(404).send({error: "Usuário não encontrado."});
      }

    }

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
      if (prop === 'password') {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body[prop], salt);

        if (!bcrypt.compareSync(user.password, hash)) {
          user[prop] = hash;
        }
      } else {
        user[prop] = req.body[prop];
      }
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
