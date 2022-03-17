const { XLSXtoCSV } = require("../helper/conversion");

const preProcessing = (req, res, next) => {
	try {
		const orignal_fileName = req.file.filename;
		// console.log(req.file);
		req.file.filename =
			__dirname + "/../uploads/" + XLSXtoCSV(orignal_fileName);
		next(null);
	} catch (err) {
		console.log("Error while preprocessing the data", err.message);
		if (err.message === "w-ext") {
			res.status(503).send("Invalid Extension");
		} else {
			res.status(503).send("Server Side Error");
		}
	}
};
module.exports = { preProcessing };
