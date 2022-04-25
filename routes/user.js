const express = require("express");
const User = require("../models/User");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middlewares/authenticate");

//For adding user
router.post("/create_user", async (req, res) => {
	try {
		const user = new User(req.body);
		const result = await user.save();
		// const token = await result.generateToken();
		// res.cookie("jwt", token, {
		// 	httpOnly: true,
		// 	// expires: new Date(Date.now() + 600000),
		// });
		res.status(201).json(result);
	} catch (error) {
		console.log(error);
	}
});

//For Logging in user
router.post("/login_user", async (req, res) => {
	try {
		const result = await User.findOne({ username: req.body.username });
		const auth = await bcrypt.compare(req.body.password, result.password);
		console.log(req.body.password, result.password);
		if (auth) {
			// const token = await result.generateToken();
			// res.cookie("jwt", token, {
			// 	httpOnly: true,
			// 	// expires: new Date(Date.now() + 600000),
			// });
			res.status(200).json(result);
		} else {
			res.json(false);
		}
	} catch (error) {
		console.log(error);
	}
});

//for logout a user
router.get("/logout", async (req, res) => {
	try {
		// const verifyToken = await jwt.verify(
		// 	req.cookies.jwt,
		// 	"mynameispratikvaidyamerndeveloper"
		// );
		// const user = await User.findOne({ _id: verifyToken._id });
		// const result = await user.deleteToken(); // returns true is token is deleted successfully
		res.clearCookie("jwt");
		res.status(200).json("dome");
	} catch (error) {
		console.log(error);
	}
});

//For Authenticating User
router.get("/auth", Authenticate, async (req, res) => {
	try {
		if (!req.token) {
			return res.status(401).json(false);
		}
		res.status(200).json(true);
	} catch (error) {
		res.status(401).json(false);
		console.log(error);
	}
});

module.exports = router;
