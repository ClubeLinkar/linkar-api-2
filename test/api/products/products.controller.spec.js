'use strict'

var mongoose = require('mongoose');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var controller = require('../../../src/api/products/products.controller');

var Product = require('../../../src/api/products/product');

require('sinon-mongoose');

describe("Products Controller", () => {

  beforeEach(function () {
    sinon.stub(Product, 'find');
    sinon.stub(Product, 'findOne');
    sinon.stub(Product, 'update');
    // sinon.stub(Product, 'create');
  });

  afterEach(function () {
    Product.find.restore();
    Product.findOne.restore();
    Product.update.restore();
    // Product.create.restore();
  });

  describe("List Products", () => {

      it("Should not list products to unauthorized user ", () => {

        let req, res, spy;

        req = res = {};
        spy = res.json = sinon.spy();

        controller.list(req, res);

        expect(spy.calledWith({error: "Autenticação requerida."})).to.equal(true);
      });

      it('should list all products to an administrator user', () => {
        let allProducts = [{name: 'Riser de Guidão'}, {name: 'Bauleto Givi'}, {name: 'Batata Frita'}];

        let companyProducts = [allProducts[0], allProducts[1]];

        let req = { params: { }, user: {_id: 'ABC123', role: 'ADMIN'} };
        let res = {
          json: sinon.stub()
        };

        Product.find.withArgs({}).yields(null, allProducts);

        controller.list(req, res);

        sinon.assert.calledWith(res.json, allProducts);

      });

      it('should restrict products list to a non administrator user', () => {

        let allProducts = [{name: 'Riser de Guidão'}, {name: 'Bauleto Givi'}, {name: 'Batata Frita'}];

        let companyProducts = [allProducts[0], allProducts[1]];

        let req = { params: { }, user: {_id: 'ABC123', role: 'COMPANY'} };
        let res = {
          json: sinon.stub()
        };

        Product.find.withArgs().yields(null, companyProducts);

        controller.list(req, res);

        sinon.assert.calledWith(res.json, companyProducts);

      });

  });

  describe("Get product by id", () => {

    it("should get product with existing id", () => {
      let product = {name: 'Riser de Guidão'};

      let req = { params: {id: 'ABC123'}};

      let res = {
        json: sinon.stub()
      };

      Product.findOne.withArgs({_id: 'ABC123'}).yields(null, product);

      controller.getById(req, res);

      sinon.assert.calledWith(res.json, product);
    });

    it("shouldn't get product with inexisting id", () => {

      let req = { params: {id: 'ABC123'}};

      let res = {
        json: sinon.stub()
      };

      Product.findOne.withArgs({_id: 'ABC123'}).yields(null, {});

      controller.getById(req, res);

      sinon.assert.calledWith(res.json, {});
    });

  });

  describe("Create new product", () => {

    // @Ignore
    xit("should create new valid product", () => {

      let product = {
        name: 'Riser de Guidão',
        price: 99
      }

      let req = {body: product, user: {_id: 'ABC123', role: 'COMPANY'}};
      let res = {
        json: sinon.stub()
      };

      Product.create.yields(null);

      controller.create(req, res);

      sinon.assert.called(Product.save);

      // sinon.assert.calledWith(res.json, {data: 'Novo Product cadastrado com sucesso.'});


    });

    it("shouldn't create product if not a COMPANY user");

  });

  describe("Update an existing product", () => {

    it("should update an existing product");

  });

  describe("Remove an existing product", () => {

    it("should remove an existing product if user is an administrator");

    it("shouldn't remove an existing product if user is not an administrator");

  });

});
