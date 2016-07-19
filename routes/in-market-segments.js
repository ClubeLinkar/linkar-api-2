var express = require('express');
var router = express.Router();
var InMarketSegment = require('../models/in-market-segment');

router.post('/', function(req, res) {

  var segment = new InMarketSegment(req.body);

    segment.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({data: 'Novo InMarketSegment cadastrado com sucesso.'});
    });

});

router.get('/', function(req, res) {

  InMarketSegment.find(function (err, categories) {
    if(err) {
      return res.send(err);
    }

    res.json(categories);
  });

});

router.get('/:id', function(req, res) {

  InMarketSegment.findOne({_id: req.params.id}, function (err, segment) {
    if(err) {
      return res.send(err);
    }

    res.json(segment);
  });

});

router.put('/:id', function(req, res){

  InMarketSegment.findOne({ _id: req.params.id }, function(err, segment) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      segment[prop] = req.body[prop];
    }

    segment.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.json({ message: 'InMarketSegment atualizado!' });
    });
  });
});

router.delete('/:id', function(req, res) {

  console.log("delete");

  InMarketSegment.remove({_id: req.params.id}, function(err, segment) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'segment deletado!' });
  });
});

module.exports = router;
