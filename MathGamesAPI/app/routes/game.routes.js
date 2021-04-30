module.exports = app => {
    const games = require("../controllers/game.controller.js");
    var router = require("express").Router();
  
    // Create a new game
    router.post("/", games.create);
  
    // Retrieve all games
    router.get("/", games.findAll);
  
    // Retrieve game by id
    router.get("/:id", games.findOne);

    // Update game with id
    router.put("/:id", games.update);
  
    // Delete a game with id
    router.delete("/:id", games.delete);
  
    // Delete all games
    router.delete("/", games.deleteAll);
  
    app.use('/api/games', router);
  };