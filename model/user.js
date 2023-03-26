const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  category:String,
  phno:Number,
  mail:String,
  deposit:Number,
  min_rent_per_day:Number,
  desc:String,
  rating:Number,
  avatar:String,
  cloudinary_id:String
});

module.exports = mongoose.model("lease", userSchema,'lease');
