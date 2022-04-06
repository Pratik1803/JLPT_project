require("dotenv").config();
require("./database/connection");
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//routers
const addKanjis = require("./routes/kanji");

app.use(express.json());
app.use(addKanjis);


if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
};

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
