const express = require("express");
// Initialize app
const router = express.Router();
const ISSData = require("../models/FlyingObject");

router.get("/", function (req, res) {
	// gets the last data, "-1" is sorting from the greatest to least I believe
	ISSData.find({})
		.sort({ created: -1 })
		.limit(1)
		.exec(function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log("data:", data);
				res.json(data);
			}
		});

	// this gets all the data in the MongoDB
	// ISSData.find({}, function (err, data) {
	// 		if (err) {
	// 			console.log(err);
	// 		} else {
	// 			console.log("data:", data);
	// 			res.json(data);
	// 		}
	// 	});
});

module.exports = router;
