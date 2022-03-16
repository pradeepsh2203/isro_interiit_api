const { XLSXtoCSV } = require("../helper/conversion");

const preProcessing = (req, res, next) => {
	try {
		const orignal_fileName = req.file.fileName;
		req.file.fileName = XLSXtoCSV(orignal_fileName);
		next(null);
	} catch (err) {
		if (err.message === "w-ext") {
			res.status(503).send("Invalid Extension");
		} else {
			res.status(503).send("Server Side Error");
		}
	}
};
module.exports = { preProcessing };
