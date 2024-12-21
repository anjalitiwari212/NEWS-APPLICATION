const express = require('express')
const router = express.Router() 
const {createUser,loginUser,getUser} = require('../controllers/user-controller')
const {verifyRequest} = require('../middlewares/verifyRequest')

//User signup  route
router.post("/signup",createUser)

//Login login route
router.post("/login",loginUser)

//Get user profile route
router.get("/profile", verifyRequest, getUser)

module.exports = router