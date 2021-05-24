const { authJwt } = require("../middleware");

module.exports = app => {
    const matches = require("../controllers/gamematch.controller.js");
    var router = require("express").Router();
  
    // Create a new match
    router.post("/", matches.create);
  
    // Retrieve all matches
    router.get("/", authJwt.verifyToken, matches.findAll);

    // Retrieve statistics. Games per day
    router.get("/statistics", [authJwt.verifyToken, authJwt.isAdmin], matches.statistics);

    // Retrieve statistics. Percentage of each game played
    router.get("/statisticsbygame", [authJwt.verifyToken, authJwt.isAdmin], matches.statisticsbygame);
  
    // Retrieve match by id
    router.get("/:id", matches.findOne);

    // Update match with id
    router.put("/:id", matches.update);
  
    // Delete a match with id
    router.delete("/:id", matches.delete);
  
    // Delete all matches
    router.delete("/", matches.deleteAll);
  
    app.use('/api/matches', router);
  };