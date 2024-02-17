const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const signupSchema = mongoose.Schema({
    name:{type:String, requiered:true, unique:true},
    password:{type:String, requiered:true}

})
signupSchema.plugin(uniqueValidator);

module.exports=mongoose.model('signupModel',signupSchema)