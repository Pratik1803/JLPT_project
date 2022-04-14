require("dotenv").config();
require("./database/connection");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;

//routers
const addKanjis = require("./routes/kanji");
const user = require("./routes/user");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());
app.use(addKanjis);
app.use(user);

// const createToken = async ()=>{
// 	try {
// 		const token = await jwt.sign({_id:"12345678910"}, "mynameispratikvaidyamernstackdeveloper")
// 		console.log(token);
// 		const ver = await jwt.verify(token, "mynameispratikvaidyamernstackdeveloper");
// 		console.log(ver);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// createToken();

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
