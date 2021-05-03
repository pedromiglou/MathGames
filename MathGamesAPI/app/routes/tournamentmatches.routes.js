module.exports = app => {
    const tournamentmatches = require("../controllers/tournamentmatches.controller.js");
    var router = require("express").Router();
  
    // Create a new tournament match
    router.post("/", tournamentmatches.create);
  
    // Retrieve all tournamentmatches
    router.get("/", tournamentmatches.findAll);
  
    // Retrieve a all matches of a tournament with the tournament id
    router.get("/:id", tournamentmatches.findByTournament);
  
    // Update a tournamentMatch with matchId
    router.put("/:id", tournamentmatches.update);
  
    // Delete a tournamentMatch with matchId
    router.delete("/:id", tournamentmatches.delete);
  
    // Delete all tournamentmatches
    router.delete("/", tournamentmatches.deleteAll);
  
    app.use('/api/tournamentmatches', router);
  };