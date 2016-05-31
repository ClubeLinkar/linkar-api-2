var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
   companyId: {type: String},
   companyName: {type: String},

   productId: {type: String},
   productName: {type: String},
   productUnitPrice: {type: Number, min: 0},
   productQuantity: {type: Number, min: 1},
   productCategories: [String],

   amount: {type: String},

   customerId: {type: String},
   customerEmail: {type: String},
   customerName: {type: String},

   creatorId: {type: String},
   creatorName: {type: String},
   creatorEmail: {type: String},
   dateCreated: {type: Date, default: Date.now}
});

TransactionSchema.pre('save', function (next) {
    this.amount = this.productUnitPrice * this.productQuantity;
    next();
});

module.exports = mongoose.model('Transaction', TransactionSchema)
