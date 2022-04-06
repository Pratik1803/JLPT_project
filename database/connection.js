const mongoose = require("mongoose");
const DB = process.env.DB;

mongoose.connect(DB).then(()=>{
    console.log("Connection Successful!");
}).catch((err)=>{
    console.log(err);
});