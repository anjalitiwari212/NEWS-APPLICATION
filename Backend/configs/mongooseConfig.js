const mongoose = require('mongoose')

async function DBConnect(){
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("MongooseConfig : Connected to Database")   
    }
    catch(err){
        console.log("MongooseConfig : Not connected to Database")
        process.exit(1)
    }
}

module.exports = DBConnect