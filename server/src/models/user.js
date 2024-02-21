const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({ 
  fullName: String,// String is shorthand for {type: String}
  email:String,
  phone:{type:Number, unique:true, required:true},
  gender: String,
  dob:Date,
  password:String,
  role:{type:String, enum:['User', 'Admin'], default:'User'},
  profilePic:String
});

const User = mongoose.model('User', userSchema);

module.exports=User