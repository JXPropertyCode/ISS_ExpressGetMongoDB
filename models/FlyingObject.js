const mongoose = require("mongoose");

let flyingObjectSchema = mongoose.Schema({
	timestamp: String,
	lat: Number,
	lng: Number,
	created: {
		type: Date,
		// `Date.now()` returns the current unix timestamp as a number
		default: Date.now,
	},
});

module.exports = mongoose.model("ISSData", flyingObjectSchema, "issData");
