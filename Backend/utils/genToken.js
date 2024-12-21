const jwt = require('jsonwebtoken')

module.exports.genToken = function(payLoad){

    //jwt token options for specific tasks
    const options = {
        expiresIn: '24h',
    }
    const token = jwt.sign(payLoad,process.env.JWT_SECRET_KEY,options)
    return token
}
