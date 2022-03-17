const XLSX = require("xlsx");
const fs = require("fs");
const req = require("express/lib/request");
// Converts the data from ascii,xlsx to csv and save it in file.csv and then returns the fileName;
const XLSXtoCSV = (fileName) => {
	// console.log(fileName);
	const extension = fileName.substring(fileName.lastIndexOf(".") + 1);
	if (extension === "fits" || extension === "csv") {
		return fileName;
	} else if (extension === "xls") {
		const data = XLSX.readFile(fileName);
		XLSX.writeFile(data, __dirname + "/../uploads/file.csv");
		return "file.csv";
	} else {
		throw new Error("w-ext");
	}
};
// XLSXtoCSV(__dirname + "/../uploads/testFile.fits");
module.exports = { XLSXtoCSV };
