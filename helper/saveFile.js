const fs = require("fs");

// saves the result of the ML model in result.csv
const saveFile = (data) => {
	try {
		let result =
			"rise,decay,type,rise_start,peaks_time,decay_end,peak_values,bg_for_this_peak,rise_rate\n";

		let len = data[0].length;
		for (let j = 0; j < len; j++) {
			for (let i = 0; i < 9; i++) {
				result += data[i][0];
				if (i !== 8) {
					result += ",";
				} else if (j !== len - 1) {
					result += "\n";
				}
			}
		}
		fs.writeFileSync(__dirname + "/../uploads/result.csv", result);
		return result;
	} catch (err) {
		console.log("Error while saving the result in csv file");
		throw new Error("err-save");
	}
};

// Test Condition
// saveFile([
// 	[1, 2],
// 	[12, 3],
// 	[1, 1],
// 	[0, 0],
// 	[3, 4],
// 	[5, 6],
// 	[2, 2],
// 	[6, 5],
// 	[8, 3],
// ]);

module.exports = { saveFile };
