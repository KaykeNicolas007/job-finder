const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

router.get("/add", function (req, res) {
  res.render("add");
});

router.post("/add", function (req, res) {
  let { title, salary, company, description, email, new_job } = req.body;

  Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job,
  })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      console.error(`Error detected during "post" execution: ${err}`);
    });
});

module.exports = router;
