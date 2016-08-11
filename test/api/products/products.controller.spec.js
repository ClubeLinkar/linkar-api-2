var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var controller = require('../../../src/api/products/products.controller');

describe("Products Controller", function() {

  describe("List Products", function() {

      it("Should not list products to unauthorized user ", function() {

        var req, res, spy;

        req = res = {};
        spy = res.json = sinon.spy();

        controller.list(req, res);

        expect(spy.calledWith({error: "Autenticação requerida."})).to.equal(true);
      });

  });
});
