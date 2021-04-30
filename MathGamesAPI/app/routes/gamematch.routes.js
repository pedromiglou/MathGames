module.exports = app => {
    const matches = require("../controllers/gamematch.controller.js");
    var router = require("express").Router();
  
    // Create a new match
    router.post("/", matches.create);
  
    // Retrieve all matches
    router.get("/", matches.findAll);
  
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