const express = require("express");
const router = express.Router();
const cors = require("cors");
const Kanjis = require("../models/Kanji");
const User = require("../models/User");

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
		const result = await Kanjis.find({ level: req.query.level });
		res.status(200).json(result);
	} catch (error) {
		console.log(error);
	}
});

router.patch("/favs", async (req, res) => {
	try {
		const userDetails = await User.findOne({ _id: req.body.userID });
		if (req.body.action === "add") {
			userDetails.favs.push(req.body.word);
		} else if (req.body.action === "delete") {
			userDetails.favs.splice(userDetails.favs.indexOf(req.body.word), 1);
		}
		const result = await User.findByIdAndUpdate(
			{ _id: req.body.userID },
			{ favs: userDetails.favs }
		);
		res.status(201).json({ result: userDetails });
	} catch (error) {
		res.status(401).json({ message: "Invalid Request!" });
		console.log(error);
	}
});

module.exports = router;
