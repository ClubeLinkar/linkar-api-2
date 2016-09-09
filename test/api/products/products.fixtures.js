//FIXME use generators!!!

function aValidProduct() {
  return {
    name: 'Riser de Guidão Anker',
    price: 99
  };
}

function anotherValidProduct() {
  return {
    name: 'Bauleto Givi',
    price: 250
  };
}

function otherValidProduct() {
  return {
    name: 'Batata Frita',
    price: 12.50
  };
}

module.exports.aValidProduct = aValidProduct;
module.exports.anotherValidProduct = anotherValidProduct;
module.exports.otherValidProduct = otherValidProduct;
