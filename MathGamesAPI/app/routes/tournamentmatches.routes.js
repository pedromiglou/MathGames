module.exports = app => {
    const tournamentMatches = require("../controllers/tournamentmatches.controller.js");
  
    // Create a new tournament Match
    app.post("/tournamentmatches", tournamentMatches.create);
  
    // Retrieve all tournamentMatches
    app.get("/tournamentmatches", tournamentMatches.findAll);
  
    // Retrieve all tournamentMatch with tournamentId
    app.get("/tournamentmatches/:tournamentId", tournamentMatches.findByTournamentId);
  
    // Update a tournamentMatch with matchId
    app.put("/tournamentmatches/:matchId", tournamentMatches.update);
  
    // Delete a tournamentMatch with matchId
    app.delete("/tournamentmatches/:matchId", tournamentMatches.delete);
  
    // Delete all tournamentMatches
    app.delete("/tournamentmatches", tournamentMatches.deleteAll);
  };