const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

/*
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MathGames Rest API" });
});
*/
module.exports = router;

