const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  category:String,
  location:String,
  wage:Number,
  desc:String,
  avatar:String,
  cloudinary_id:String
});

module.exports = mongoose.model("Serviceflyer", userSchema,'Serviceflyer');