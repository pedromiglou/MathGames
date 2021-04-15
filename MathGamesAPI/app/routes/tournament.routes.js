module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");
  
    // Create a new tournament
    app.post("/tournaments", tournaments.create);
  
    // Retrieve all tournaments
    app.get("/tournaments", tournaments.findAll);
  
    // Retrieve a single tournament with tournamentId
    app.get("/tournaments/:tournamentId", tournaments.findOne);
  
    // Update a tournament with tournamentId
    app.put("/tournaments/:tournamentId", tournaments.update);
  
    // Delete a tournament with tournamentId
    app.delete("/tournaments/:tournamentId", tournaments.delete);
  
    // Delete all tournaments
    app.delete("/tournaments", tournaments.deleteAll);
  };