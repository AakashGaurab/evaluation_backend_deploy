const express = require("express");

const userstats = express.Router();


userstats.get("/",(req,res)=>{
    res.send("User Stats");
})


module.exports={userstats};