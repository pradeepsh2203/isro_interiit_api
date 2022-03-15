const { spawn } = require("child_process");

const runModel = async () => {
	console.log("Running Python Script");
	let dataToSend;
	const python = spawn("python", [__dirname + "/script1.py"]);
	python.stdout.on("data", (data) => {
		dataToSend = data.toString();
		console.log("Data Piped", dataToSend);
	});

	python.stderr.on("data", (data) => {
		console.log("err", data.toString());
	});

	python.on("close", (code) => {
		console.log("Closing", code);
		return dataToSend;
	});
};

module.exports = { runModel };
