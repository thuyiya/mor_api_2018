const jwt = require('jsonwebtoken');
const secretekey = "myapplicationsecretekey";

module.exports = {
    "secrete" : secretekey,
}

module.exports.verifytoken =function (req,res,next){
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader);
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token,secretekey,(err,userdata)=>{
            if(err){
                res.sendStatus(401);
            } 
            else{
                req.user=userdata;
                next();
            }
        });

        
    } else{
        res.sendStatus(401);

    }
};