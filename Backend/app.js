const express = require('express')
const app = express()
require('dotenv').config()
const DBConnect = require('./configs/mongooseConfig')

DBConnect()

app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.listen(process.env.PORT || process.env.port,()=>{
    console.log("Server is running on port ",process.env.PORT || process.env.port) 
})