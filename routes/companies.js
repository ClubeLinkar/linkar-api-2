var express = require('express');
var router = express.Router();
var Company = require('../models/company');

var bcrypt = require('bcryptjs');

router.post('/', function(req, res) {

  var company = new Company(req.body);

    company.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({data: 'Novo Company cadastrado com sucesso.'});
    });

});

router.get('/', function(req, res) {

  var ommitedFields = {password: 0};

  if (req.query.email) {
    Company.find({email: req.query.email}, ommitedFields, findCompaniesCallback);
  } else {
    Company.find({}, ommitedFields, findCompaniesCallback);
  }

  function findCompaniesCallback(err, companies) {
    if(err) {
      return res.send(err);
    }

    if (companies.length > 0){
      res.json(companies);
    } else {
      res.status(404).send({error: "Empresa não encontrada."});
    }


  }

});

router.get('/:id', function(req, res) {

  Company.findOne({_id: req.params.id}, function (err, company) {
    if(err) {
      return res.send(err);
    }

    res.json(company);
  });

});

router.put('/:id', function(req, res){

  Company.findOne({ _id: req.params.id }, function(err, company) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      if (prop === 'password') {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body[prop], salt);

        if (!bcrypt.compareSync(company.password, hash)) {
          company[prop] = hash;
        }
      } else {
        company[prop] = req.body[prop];
      }
    }

    company.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'Company atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  Company.remove({_id: req.params.id}, function(err, company) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Company deletado!' });
  });
});

module.exports = router;
