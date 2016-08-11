var express = require('express');
var router = express.Router();
var Company = require('../companies/company');
var Product = require('../products/product');

router.get('/:login', function(req, res) {

  Company.findOne({login: req.params.login}, function (err, company) {

    if(err) {
      console.log(err);
      return res.send(err);
    }

    if(!company) {
      return res.status(400).send({error: 'Empresa não encontrada.'});
    }

    var ommitedFields = {
      _id: 0,
      code: 0,
      companyId: 0,
      categories: 0,
      __v: 0
    }

    Product.find({companyId: company._id, featured: true}, ommitedFields, function (err, featuredProducts) {
      if(err) {
        console.log(err);
        return res.send(err);
      }

      var hotsite = {
        company: {
          name: company.name,
          desc: company.description,
          addr: company.address,
          phones: company.phones,
          email: company.email,
          site: company.site,
          social: company.social
        },
        products: featuredProducts
      }

      res.json(hotsite);
    });

  });

});

module.exports = router;
