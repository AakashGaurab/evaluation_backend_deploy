const express = require("express");
const app = express();
require("dotenv").config();
const {connect}=require("./config/db")
const {user}=require("./routes/user_route");
const {gold} = require("./routes/goldrate");
const {userstats}=require("./routes/userstats");
const {auth}=require("./middleware/auth");
const {authorize}=require("./middleware/authorize");
const {refresh}=require("./middleware/refresh_toke");


app.use(express.json());
app.use("/goldrates",auth,gold);
app.use("/refresh_token",refresh)
app.use("/userstats",auth,authorize(["manager"]),userstats);
app.use("/user",user);
app.listen(process.env.port,async ()=>{
    try {
        await connect;
        console.log(`Server is running at http://localhost:${process.env.port}`);
    } catch (error) {
        console.log(error);
    }
    
})
