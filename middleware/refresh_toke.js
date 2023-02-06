const express = require("express");
const jwt = require("jsonwebtoken");


const refresh = express.Router();
refresh.get("/",(req,res)=>{
    let token = req.headers.token;
    jwt.verify(token,"secret",(err,decoded)=>{
        if (err){
           res.json("Refresh Token Also Expired");
        }
        else {
            let email = decoded.email;
            let new_normal_token= jwt.sign({email:email},"key")
            res.json({"New Normal Token":new_normal_token});
        }
    })    
})


module.exports={refresh};