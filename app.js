require("dotenv").config();
require("./database/connection");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;
const cors = require('cors');

//routers
const addKanjis = require("./routes/kanji");
const user = require("./routes/user");
const jwt = require("jsonwebtoken");

app.use(cors({ origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use(addKanjis);
app.use(user);

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
