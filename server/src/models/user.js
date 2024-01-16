const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({ 
  firstName: String,// String is shorthand for {type: String}
  lastName: String,// String is shorthand for {type: String}
  email:String,
  phone:{type:Number, unique:true, required:true},
  gender: String,
  dob:Date,
  password:String,
});

const User = mongoose.model('User', userSchema);

module.exports=User