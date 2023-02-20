const User = require("../Models/User");
const bcrypt = require("bcryptjs")
const router = require("express").Router()
const jwt = require("jsonwebtoken")
router.post("/signup",async(req,res)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newuser = User({...req.body,password:hash})
        const Saveduser = await newuser.save();
        res.status(200).json(Saveduser)
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})
router.post("/signin",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user){
            res.status(500).json("Wrong Credentials")
        }else{
            const checkpassword = await bcrypt.compare(req.body.password,user.password)
            if (!checkpassword){
                res.status(500).json("Wrong Credentials")
            }else{
                const {password,...other} = user._doc
                const token = jwt.sign({id:user._id},process.env.JWTKEY)
                res.status(200).json({other,token})
            }
        }
    }catch(err){

    }
})
module.exports = router