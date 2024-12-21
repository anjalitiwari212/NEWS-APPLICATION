const jwt = require('jsonwebtoken');
module.exports.verifyRequest = (req, res, next) => {
    //getting the token
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied. No token provided.');
   
    // verifiying the token
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
    
    // Sending error response if token is not valid
    if(err) return res.status(401).send('Access Denied. Token is not verfied or token expired');
        
    //sending the decoded data if token is valid
    req.user = decoded;
    next();

  })

}