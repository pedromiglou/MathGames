const { authJwt} = require("../middleware");

module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");
    var router = require("express").Router();
  
    // Create a new tournament
    router.post("/", [authJwt.verifyToken, authJwt.isTournamentManager], tournaments.create);

    // Create a new tournament
    router.post("/join", [authJwt.verifyToken], tournaments.entrarTorneio);
  
    // Retrieve all tournaments
    router.get("/", tournaments.findAll);
  
    // Retrieve a single tournament with id
    router.get("/:id", tournaments.findOne);
  
    // Update a tournament with id
    router.put("/:id", tournaments.update);
  
    // Delete a tournament with id
    router.delete("/:id", tournaments.delete);
  
    // Delete all tournaments
    router.delete("/", tournaments.deleteAll);
  
    app.use('/api/tournaments', router);
  };