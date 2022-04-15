const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		validate(email) {
			if (!validator.isEmail(email)) {
				throw new Error("Email is Invalid!");
			}
		},
		unique: true,
		trim: true,
	},
	favs: [String],
	password: String,
	tokens:[{
		token:{
			type:String,
			required:true
		}
	}]
});

//generating tokens
userSchema.methods.generateToken = async function () {
	try {
		const token = await jwt.sign(
			{ _id: this._id.toString() },
			"mynameispratikvaidyamerndeveloper"
		);
		this.tokens = [{token}];
		await this.save();
		return token;
	} catch (error) {
		res.send("Token generation Error: " + error);
	}
};

//WRPhYTVCe
//WRPhYTVCe

//Vw2FQAyYWhgC

// deleting token
userSchema.methods.deleteToken = async function(){
	try {
		this.tokens = undefined;
		await this.save();
		return true; // returns true if token deleted successfully
	} catch (error) {
		res.status(401).send(`Error While Deleting token: ${error}`);
	};
};

//hashing passwords
userSchema.pre("save", async function (next) {
	try {
		this.password = await bcrypt.hash(this.password, 10);
		next();
	} catch (error) {
		console.log(error);
	}
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
