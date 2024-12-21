const express = require('express')
const app = express()
require('dotenv').config()
const DBConnect = require('./configs/mongooseConfig')
const userRoute = require('./routes/user-route')
DBConnect()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// User signup  route
app.use("/api/users",userRoute)


app.listen(process.env.PORT || process.env.port,()=>{
    console.log("Server is running on port ",process.env.PORT || process.env.port) 
})