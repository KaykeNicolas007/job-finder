const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`Listening in port ${PORT}`);
});

app.get("/", function (req, res) {
  res.send("Hello, world!");
});
