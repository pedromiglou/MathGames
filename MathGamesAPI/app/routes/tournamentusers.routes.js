module.exports = app => {
    const tournamentUsers = require("../controllers/tournamentusers.controller.js");
    var router = require("express").Router();
  
    // Create a new tournament user
    router.post("/", tournamentUsers.create);
  
    // Retrieve all tournamentUsers
    router.get("/", tournamentUsers.findAll);
  
    // Retrieve a all users of a tournament with the tournament id
    router.get("/:id", tournamentUsers.findByTournament);
  
    // Update a tournamentUser with userId
    //router.put("/:tournamentId/:userId", tournamentUsers.update);
  
    // Delete a tournamentUser with Ids
    router.delete("/:tournamentId/:userId", tournamentUsers.delete);
  
    // Delete all tournamentUsers
    router.delete("/", tournamentUsers.deleteAll);
  
    app.use('/api/tournamentusers', router);
  };