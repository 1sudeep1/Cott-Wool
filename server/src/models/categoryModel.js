const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoryModelSchema = new Schema({ 
  categoryName: String,// String is shorthand for {type: String}
  subCategoryName:Array,
});

const Category = mongoose.model('Category', categoryModelSchema);

module.exports=Category