// Imports
const express = require("express");
const cors = require("cors");
const app = express();
const UploadRouter = require("./routes/upload");
const ResultRouter = require("./routes/download");

// Configuration
app.use("/", express.urlencoded({ extended: true }));
app.use("/", express.json({ strict: false }));
app.use("/", cors());

// All The routes
app.get("/", (req, res) => {
	res.send("This is the testPage for the API to check if the API works");
});
app.use("/uploads", UploadRouter);
app.use("/result", ResultRouter);

app.listen(process.env.PORT || 3000, () => {
	console.log("Server runnning on port", process.env.PORT || 3000);
});
