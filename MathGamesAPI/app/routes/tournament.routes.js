const { authJwt} = require("../middleware");

module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");
    var router = require("express").Router();
  
    // Create a new tournament
    router.post("/", [authJwt.verifyToken, authJwt.isTournamentManager], tournaments.create);

    // Join a tournament
    router.post("/join", [authJwt.verifyToken], tournaments.join);

    // Initialize tournament
    router.post("/initialize", [authJwt.verifyToken], tournaments.initialize);
  
    // Retrieve all tournaments
    router.get("/", [authJwt.verifyToken], tournaments.findAll);
  
    // Retrieve a single tournament with id
    router.get("/:id", [authJwt.verifyToken], tournaments.findOne);
  
    // Update a tournament with id
    router.put("/:id", [authJwt.verifyToken], tournaments.update);
  
    // Delete a tournament with id
    router.delete("/:id", [authJwt.verifyToken], tournaments.delete);
  
    // Delete all tournaments
    router.delete("/", tournaments.deleteAll);
  
    app.use('/api/tournaments', router);
  };