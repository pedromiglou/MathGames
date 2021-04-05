module.exports = app => {
    const tournamentUsers = require("../controllers/tournamentusers.controller.js");
  
    // Create a new tournament User
    app.post("/tournamentusers", tournamentUsers.create);
  
    // Retrieve all tournamentUsers
    app.get("/tournamentusers", tournamentUsers.findAll);
  
    // Retrieve all Users with tournamentId
    app.get("/tournamentusers/:tournamentId", tournamentUsers.findByTournamentId);
  
    // Update a tournamentUser with userId
    app.put("/tournamentusers/:tournamentId/:userId", tournamentUsers.update);
  
    // Delete a tournamentUser with userId
    app.delete("/tournamentusers/:tournamentId/:userId", tournamentUsers.delete);
  
    // Delete all tournamentUsers
    app.delete("/tournamentusers", tournamentUsers.deleteAll);
  };