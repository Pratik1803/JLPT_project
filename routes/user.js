const express = require("express");
const User = require("../models/User");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const Authenticate = require("../middlewares/authenticate");

//For adding user
router.post("/create_user", async (req, res) => {
	try {
		const user = new User(req.body);
		const token = await user.generateToken();
		const result = await user.save();
		res.cookie("jwt", token, {
			httpOnly: true,
			expires: new Date(Date.now() + 600000)
		});
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
			const token = await result.generateToken();
			res.cookie("jwt", token, {
				httpOnly: true,
				expires: new Date(Date.now() + 600000)
			});
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

//For Authenticating User
router.get("/auth", Authenticate, async (req,res)=>{
	try {
		if(!req.token){
			return res.status(401).send(false);
		};
		res.status(200).send(true);
	} catch (error) {
		res.status(401).send(false);
		console.log(error);
	}
})

module.exports = router;
