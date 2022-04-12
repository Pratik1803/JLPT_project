const express = require("express");
const User = require("../models/User");
const router = new express.Router();
const bcrypt = require("bcryptjs");

//For adding user
router.post("/create_user", async (req, res) => {
	try {
		const result = await User(req.body).save();
		res.status(201).send(result);
	} catch (error) {
		console.log(error);
	}
});

//For Logging in user
router.post("/login_user", async (req, res) => {
	try {
		const result = await User.findOne({ username: req.body.username });

		if (result) {
			const auth = await bcrypt.compare(req.body.password, result.password);
			if (auth) {
				res.status(200).send(result);
			} else {
				res.send(false);
			}
		} else {
			res.send(false);
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
