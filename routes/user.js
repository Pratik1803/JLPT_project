const express = require("express");
const User = require("../models/User");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Authenticate = require("../middlewares/authenticate");
const cors = require("cors");


//For adding user
router.post("/create_user", async (req, res) => {
	try {
		const user = new User(req.body);
		const result = await user.save();
		const token = await result.generateToken();
		res.cookie("jwt", token, {
			httpOnly: true,
		});
		res.status(201).json(result);
	} catch (error) {
		res.status(400).json({message:"failed!"})
		console.log(error);
	}
});

//For Logging in user
router.post("/login_user", async (req, res) => {
	try {
		const result = await User.findOne({ username: req.body.username });
		const auth = await bcrypt.compare(
			req.body.password,
			String(result?.password)
		);
		if (auth) {
			const token = await result.generateToken();
			res.cookie("jwt", token, {
				httpOnly:true
			});
			res.json({ status: 200, auth: true, data: result });
		} else {
			res.json({ status: 200, auth: false, data: result });
		}
	} catch (error) {
		console.log(error);
	}
});

//For Authenticating User
router.get(
	"/auth",
	Authenticate,
	async (req, res) => {
		try {
			if (!req.token) {
				res.status(200).json({ auth: false });
			}else{
				res.status(200).json({ auth: true, uid:req.userID, favs:req.favs });
			}
		} catch (error) {
			res.status(401).json({ message: "Something went Wrong..." });
			console.log(error);
		}
	}
);

//To logout the user by deleting the cookie
router.get("/logout", async (req, res) => {
	try {
		res.clearCookie("jwt");
		res.json({status:200, message: "logout successful!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({status:400, message: "something went wrong!" });
	}
});

module.exports = router;
