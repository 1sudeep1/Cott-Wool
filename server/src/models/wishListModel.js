const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishListModelSchema = new Schema({ 
    productImage:String,
    productName:String,
    productPrice:Number,
    userId:String,
});

const WishList = mongoose.model('WishList', wishListModelSchema);

module.exports=WishList