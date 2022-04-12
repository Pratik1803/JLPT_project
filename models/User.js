const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	username: {
		type:String,
		unique:true,
		trim:true
	},
	email: {
		type: String,
		validate(email) {
			if (!validator.isEmail(email)) {
				throw new Error("Email is Invalid!");
			}
		},
		unique:true,
		trim:true
	},
	favs:[String],
	password: String,
	
});

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
