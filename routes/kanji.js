const express = require("express");
const router = new express.Router();
const cors = require("cors");
const Kanjis = require("../models/Kanji");

router.post("/add_kanji", async (req, res) => {
	try {
		const result = await Kanjis(req.body).save();
		res.status(201).json(result);
	} catch (error) {
		console.log(error);
	}
});

router.get("/kanjis", cors({ origin: true }), async (req, res) => {
	try {
		const result = await Kanjis.find();
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
