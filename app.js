const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Listening in port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

db.authenticate()
  .then(function () {
    console.log("Database connection established!");
  })
  .catch(function (err) {
    console.error(`Error detected: ${err}`);
  });

app.get("/", function (req, res) {
  res.send("Working well!");
});

app.use("/jobs", require("./routes/jobs"));
