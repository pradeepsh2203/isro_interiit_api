const express = require("express");
const router = express.Router();
const multer = require("multer");
const { spawn } = require("child_process");
const { preProcessing } = require("../middleware/preProcessing");
const { saveFile } = require("../helper/saveFile");
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

router.post("/", upload.single("file"), preProcessing, async (req, res) => {
	try {
		let dataToSend;
		const python = spawn("python", [__dirname + "/../scripts/script.py"]);
		// console.log("THe filename in the script", req.file.filename);
		python.stdin.write(req.file.filename);
		python.stdin.end();
		// console.log("Inputed Value");
		python.stdout.on("data", (data) => {
			dataToSend = data.toString();
		});

		python.stderr.on("data", (data) => {
			console.log("Error occured in ML Script", data.toString());
			throw new Error("err-script");
		});

		python.on("close", (code) => {
			// console.log("Final Results", dataToSend);
			result = saveFile(dataToSend);
			res.status(200).send(result);
		});
	} catch (err) {
		console.log("Error in upload File", err.message);
		res.status(503);
		if (err.message === "err-script") {
			res.send("Error Occured in Model");
		} else if (err.message === "err-save") {
			res.send("Can't Save the result, Try Later!!");
		} else {
			res.send("Server Side error");
		}
	}
});

module.exports = router;
