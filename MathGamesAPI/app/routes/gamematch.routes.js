module.exports = app => {
    const matches = require("../controllers/gamematch.controller.js");
  
    // Create a new match
    app.post("/matches", matches.create);
  
    // Retrieve all matchs
    app.get("/matches", matches.findAll);
  
    // Retrieve a single matche with matcheId
    app.get("/matches/:matchId", matches.findOne);
  
    // Update a matche with matcheId
    app.put("/matches/:matchId", matches.update);
  
    // Delete a matche with matcheId
    app.delete("/matches/:matchId", matches.delete);
  
    // Delete all matches
    app.delete("/matches", matches.deleteAll);
  };