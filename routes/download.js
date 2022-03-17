const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/download", (req, res) => {
	res.download(__dirname + "/../uploads/result.csv");
});

router.get("/", (req, res) => {
	try {
		const data = fs.readFileSync(__dirname + "/../uploads/result.csv");
		res.status(200).send(data);
	} catch (err) {
		console.log("Error while getting content ", err.message);
		res.status(503).send("Server side Error");
	}
});

module.exports = router;
