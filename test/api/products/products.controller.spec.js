var mongoose = require('mongoose');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var controller = require('../../../src/api/products/products.controller');

var Product = require('../../../src/api/products/product');

require('sinon-mongoose');

describe("Products Controller", function() {

  beforeEach(function() {
    sinon.stub(Product, 'find');
  });

  afterEach(function() {
    Product.find.restore();
  });

  describe("List Products", function() {

      // it("Should not list products to unauthorized user ", function() {
      //
      //   var req, res, spy;
      //
      //   req = res = {};
      //   spy = res.json = sinon.spy();
      //
      //   controller.list(req, res);
      //
      //   expect(spy.calledWith({error: "Autenticação requerida."})).to.equal(true);
      // });


      it('should list all products to an administrator user', function() {
        var a = { name: 'AAAAA' };
        var b = { name: 'BBBBB' };
        var expectedProducts = [a, b];

        Product.find.yields(null, expectedProducts);

        var req = { params: { }, user: {role: 'ADMIN'} };
        var res = {
          json: sinon.stub()
        };

        controller.list(req, res);

        sinon.assert.calledWith(res.json, expectedProducts);
      });


  });

});
