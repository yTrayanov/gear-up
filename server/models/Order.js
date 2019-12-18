const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    address:{type:mongoose.Schema.Types.String, required},
    addictionalInfo:{type:mongoose.Schema.Types.String},
    manga:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order;