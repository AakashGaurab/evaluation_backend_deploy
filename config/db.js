const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://akashgaurav456:Aakash@cluster0.jzlio7b.mongodb.net/eval?retryWrites=true&w=majority");

module.exports={connect};