const mongoose=require('mongoose')
const l=new mongoose.Schema({
    name:String,
    mail:String,
    phno:Number,
    aadhar:Number,
    location:String,
    password:String
})
module.exports=mongoose.model('signup',l,'signup')