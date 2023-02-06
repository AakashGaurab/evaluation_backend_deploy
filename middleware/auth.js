const jwt = require("jsonwebtoken");
const fs = require("fs");
const {user_model}=require("../model/user_model");


const auth = (req,res,next)=>{
    let token  = req.headers.token;
    let data = JSON.parse(fs.readFileSync("./blacklist.json","utf-8")); 
    if (data.includes(token)){
        res.json("Token Invalid");
    }
    else {
        jwt.verify(token,"key",async (err,decoded)=>{
            if (err){
                res.send("Token Expired");
            }
            else {
                let email = decoded.email;
                let dat = await user_model.find({email});
                req.body.role = dat[0].role;
                next();
            }
        })
    }
    
}

module.exports={auth};