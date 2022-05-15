const express = require("express");
const mongoose = require("mongoose");

const kanjiSchema = new mongoose.Schema({
    word:String,
    meaning:String,
    on_reading:{
        reading:String,
        example:{
            eg:String,
            meaning:String,
            pronounciation:String
        }
    },
    kun_reading:{
        reading:String,
        example:{
            eg:String,
            meaning:String,
            pronounciation:String
        }
    },
    level:Number
});

const Kanjis = mongoose.model("kanji", kanjiSchema);

module.exports = Kanjis;