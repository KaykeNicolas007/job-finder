const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const Job = require("./models/Job");

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Listening in port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
  }),
);

app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));

db.authenticate()
  .then(function () {
    console.log("Database connection established!");
  })
  .catch(function (err) {
    console.error(`Error detected: ${err}`);
  });

app.get("/", function (req, res) {
  Job.findAll({ order: [["createdAt", "DESC"]] }).then(function (jobs) {
    res.render("index", {
      jobs,
    });
  });
});

app.use("/jobs", require("./routes/jobs"));
