const jwt = require("jsonwebtoken")

const Req = (req,res,next)=>{
    const authHeader = req.headers.token;
    if (authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWTKEY,(err,user)=>{
            if(err){
                return res.status(401).json("Token is not valid")
            }
            req.user=user
            next();
        })
    }else{
        res.status(401).json("You are not Authenticated")
    };
}
module.exports = Req