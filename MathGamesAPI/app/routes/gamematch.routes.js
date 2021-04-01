module.exports = app => {
    const matches = require("../controllers/gamematch.controller.js");
  
    // Create a new match
    app.post("/matches", matches.create);
  
    // Retrieve all match
    app.get("/matches", matches.findAll);
  
    // Retrieve a single match with matchId
    app.get("/matches/:matchId", matches.findOne);
  
    // Update a match with matchId
    app.put("/matches/:matchId", matches.update);
  
    // Delete a match with matchId
    app.delete("/matches/:matchId", matches.delete);
  
    // Delete all matches
    app.delete("/matches", matches.deleteAll);
  };