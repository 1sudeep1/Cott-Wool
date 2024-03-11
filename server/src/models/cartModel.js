const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartModelSchema = new Schema({ 
    productImage:String,
    productName:String,
    productPrice:Number,
    quantity:Number,
    totalPrice:Number
});

const Cart = mongoose.model('Cart', cartModelSchema);

module.exports=Cart