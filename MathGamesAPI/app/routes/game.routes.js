module.exports = app => {
    const games = require("../controllers/game.controller.js");
  
    // Create a new game
    app.post("/games", games.create);
  
    // Retrieve all games
    app.get("/games", games.findAll);
  
    // Retrieve a single game with gameId
    app.get("/games/:gameId", games.findOne);
  
    // Update a game with gameId
    app.put("/games/:gameId", games.update);
  
    // Delete a game with gameId
    app.delete("/games/:gameId", games.delete);
  
    // Delete all games
    app.delete("/games", games.deleteAll);
  };