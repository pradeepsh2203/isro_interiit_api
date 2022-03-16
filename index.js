// Imports
const express = require("express");
const app = express();
const UploadRouter = require("./routes/upload");
const DownloadRouter = require("./routes/download");

// Configuration
app.use("/", express.urlencoded({ extended: true }));
app.use("/", express.json({ strict: false }));

// All The routes
app.get("/", (req, res) => {
	res.send("This is the testPage for the API to check if the API works");
});
app.use("/uploads", UploadRouter);
app.use("/downloads", DownloadRouter);

app.listen(process.env.PORT || 3000, () => {
	console.log("Server runnning on port", process.env.PORT || 3000);
});
