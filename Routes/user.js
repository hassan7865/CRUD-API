const router = require("express").Router();
const User = require("../Models/User");
const verify = require("./VerifyToken");

// Contact ADD
router.put("/addcontact",verify,async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.user.id,{
            $push:{Contacts:req.body}
        })
        res.status(200).json("Contact Added")
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})
//Contact Delete
router.put("/:id",verify,async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.user.id,{
            $pull:{Contacts:{_id:req.params.id}}
        })
        res.status(200).json("Contact Deleted")
    }catch(err){
        res.status(500).json(err)
    }
})
//Contact Details
router.get("/contactdetail/:id",verify,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        const Find = user.Contacts.filter((items)=>{
            if(items.id === req.params.id){
                return(items)
            }
    })
        res.status(200).json(Find)
    }catch(err){
        res.status(500).json(err)
    }
})
//Contact Search
router.get("/find",verify,async(req,res)=>{
    const query = req.query.q
    try{
        const user = await User.findById(req.user.id)
        const contactfind = user.Contacts.filter((items)=>{
            const re =  (items.Contactname).toLowerCase().match(query.toLowerCase(),"i")
            return(re)
        })
        res.status(200).json(contactfind)
    }catch(err){

    }
})
router.get("/current",verify,async(req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})
module.exports = router