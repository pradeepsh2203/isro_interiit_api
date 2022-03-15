const express = require("express");
const router = express.Router();
const multer = require("multer");
const { runModel } = require("../helper/runScript");
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		return cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		const extarr = file.mimetype.split("/");
		const extension = extarr[extarr.length - 1];
		const fileName = "file." + extension; /*+ file.mimetype*/
		cb(null, fileName);
	},
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
	console.log(req.file);
	const result = await runModel();
	console.log(result, "Result");
	res.send("File recieved");
});

module.exports = router;
