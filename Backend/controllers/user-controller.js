const {userModel,validateUser} = require('../models/user-modal')
const bcrypt = require('bcrypt')
const {genToken} = require('../utils/genToken')

//controller for signup
module.exports.createUser = async (req,res)=>{
 try{
  const {name,email,password,role} =  req.body
  const error = validateUser({name,email,password,role})
  if(error) return res.status(400).send(error)

  // find user before creating in database
  let user = await userModel.findOne({email})
  if(user) return res.status(409).send("User already registered with this email")
  
  //hashing password before storing in database
  const salt = await bcrypt.genSalt()
  const hashedpassword = await bcrypt.hash(password,salt)

  //creating user if error does not accor
  user = await userModel.create({name,email,password:hashedpassword,role})

  const payLoad = {
    name: user.name,
    email: user.email,
    role: user.role,
    _id: user._id
  }
  const token = genToken(payLoad)
  res.status(201).send({data:payLoad,token:token})
 }
 catch(err){
    res.status(500).send(err)
 }
}

//controller for login
module.exports.loginUser = async (req,res)=>{
 try{
  const {email,password} = req.body
  const error = validateUser({name:"testing", email,password})
  if(error) return res.status(400).send(error)

  let user = await userModel.findOne({email})
  if(!user) return res.status(401).send("Invalid email or password")
  
  const validPass = await bcrypt.compare(password,user.password)

  if(!validPass) return res.status(401).send("Invalid email or password")
 
   const payLoad = {
      name: user.name,
      email: user.email,
      role: user.role,
      _id: user._id
    }
    const token = genToken(payLoad)
    res.status(200).send({token: token})
 }catch(err){
    res.status(500).send(err)
 }
}

//controller for get Profile

module.exports.getUser = (req,res)=>{
   if(!req.user) return res.status(500).send("Some server error while getting user")
  
      const user = {
      name:req.user.name,
      email:req.user.email,
      role: req.user.role,
      _id: req.user._id
   }
   
    res.status(200).send(user)
}