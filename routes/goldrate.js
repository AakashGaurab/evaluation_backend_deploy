const express = require("express");

const gold = express.Router();


gold.get("/",(req,res)=>{
    res.send("Gold Rates");
})

module.exports={gold};