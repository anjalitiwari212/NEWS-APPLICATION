const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:Number,default:0 }
})

function validateUser(data){
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.number().default(0)
    })
   const {error} = schema.validate(data)
   return error?.message
}

const userModel = mongoose.model("User",userSchema)

module.exports = {userModel, validateUser}
