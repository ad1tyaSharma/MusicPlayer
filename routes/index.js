const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index2.ejs");
});

module.exports = router;
