const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.download(__dirname + "/../uploads/result.csv");
});

module.exports = router;
