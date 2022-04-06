const express = require("express");
const router = express.Router();
const Kanjis = require('../models/Kanji');

router.post("/add_kanji", async (req,res)=>{
    try {
        const result = await Kanjis(req.body).save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error);
    }
});

router.get("/kanjis", async (req,res)=>{
    try {
        const result = await Kanjis.find();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;