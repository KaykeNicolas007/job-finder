const express = require("express");
const app = express();
const db = require("./db/connection");
const bodyParser = require("body-parser");

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Listening in port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));

db.authenticate()
  .then(function () {
    console.log("Database connection established!");
  })
  .catch(function (err) {
    console.error(`Error detected: ${err}`);
  });

app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.use("/jobs", require("./routes/jobs"));
