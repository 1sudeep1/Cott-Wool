const mongoose = require('mongoose');
const { Schema } = mongoose;

const productModelSchema = new Schema({ 
  productName: String,// String is shorthand for {type: String}
  productImage:String,
  productPrice:Number,
  productDescription:String,
  productCategory:String,
  productSubCategory:String
});

const Products = mongoose.model('Products', productModelSchema);

module.exports=Products