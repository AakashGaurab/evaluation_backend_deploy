const express= require("express");
const bcrypt = require("bcrypt");
const {user_model}=require("../model/user_model");
const user = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs  = require("fs");

user.use(express.json());
user.use(cookieParser());
user.post("/signup",async (req,res)=>{
    let payload = req.body;
    let {name,email,password,role}=payload;
    let d = await user_model.find({email});
    if (d.length==0){
        bcrypt.hash(password,5,async (err,hash)=>{
            if (err){
                res.send("Sign pu Failded");
            }
            else {
              await user_model.insertMany([{name,email,password:hash,role}]);
              res.json("signup Succesfull");
            }
        })
    }
    else{
        res.json("User Already sign up done in");
    } 
    
})


user.post("/login",async (req,res)=>{
    let payload = req.body;
    let {name,email,password,role}=payload;
    let data = await user_model.find({email});
    let pass = data[0].password;
    bcrypt.compare(password,pass,(err,result)=>{
        if (!result){
            res.json("Password wrong");
        }
        else {
           let normal_token = jwt.sign({email:email},"key",{expiresIn:60*60});
           let refresh_token=jwt.sign({email:email},"secret",{expiresIn:5*60*60});
           /* res.cookie("normal",normal_token,{httpOnly:true});
           res.cookie("refresh",refresh_token); */
           res.send({"msg":"Login Succesful","normal":normal_token,"refresh":refresh_token});
        }
    })
})

user.post("/logout",(req,res)=>{
    let token = req.headers.token;
     let file = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
     file.push(token);
     fs.writeFileSync("./blacklist.json",JSON.stringify(file));
     res.send("logged out Succesfully");
})


module.exports={user};

