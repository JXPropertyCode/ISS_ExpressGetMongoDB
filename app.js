// Load express module
const express = require("express");
const issData = require("./routes/issData");
const p = process.env.PORT || 8000;
const cors = require("cors");

// Initialize app
const app = express();
app.use(express.json());
app.use(cors("*"));

// Mongoose connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/iss", {
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

// Route for home
app.get("/", function (req, res) {
	res.send("hello express");
});

app.use("/issData", issData);

// Start server with port 8000
app.listen(p, function () {
	console.log(`Server started on localhost:${p}`);
});
