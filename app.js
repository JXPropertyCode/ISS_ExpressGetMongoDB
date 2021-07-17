// Mongoose connection
const mongoose = require("mongoose");
require("dotenv").config();

// Load express module
const express = require("express");
const issData = require("./routes/issData");
const p = process.env.PORT || 8000;
const cors = require("cors");
const { default: axios } = require("axios");
const FlyingObject = require("./models/FlyingObject");

// Initialize app
const app = express();
app.use(express.json());
app.use(cors("*"));

const url = process.env.MONGODB_URL;
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

// Check for DB connection
db.once("open", function () {
	console.log("Connected to MongoDB successfully!");
});
db.on("error", function () {
	console.log(err);
});

const time = 3000;

setInterval(() => {
	axios.get("http://api.open-notify.org/iss-now.json").then((response) => {
		// console.log(response.data);
		let convertResData = {
			timestamp: Number(response.data.timestamp),
			lat: Number(response.data.iss_position.latitude),
			lng: Number(response.data.iss_position.longitude),
		};

		// console.log("convertResData:", convertResData);

		// inserts data into DB
		FlyingObject.create(convertResData, function (err) {
			if (err) throw err;
			// console.log("Inserted a New Data")
			// console.log(convertResData);
		});
	});
}, time);

// Route for home
// Health Check for the server
app.get("/", function (req, res) {
	res.send("hello express");
});

app.use("/issData", issData);

// Start server with port 8000
app.listen(p, function () {
	console.log(`Server started on localhost:${p}`);
});
