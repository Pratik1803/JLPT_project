const mongoose = require("mongoose");
const DB = process.env.DB;

mongoose.connect("mongodb+srv://prtk:Domin%40r400@flashcards.n6fym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(()=>{
    console.log("Connection Successful!");
}).catch((err)=>{
    console.log(err);
});