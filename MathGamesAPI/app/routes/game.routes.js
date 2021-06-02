const { authJwt } = require("../middleware");

module.exports = app => {
    const games = require("../controllers/game.controller.js");
    var router = require("express").Router();
  
    // Create a new game
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], games.create);
  
    // Retrieve all games
    router.get("/", games.findAll);
  
    // Retrieve game by id
    router.get("/:id", games.findOne);

    // Update game with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], games.update);
  
    // Delete a game with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], games.delete);
  
    // Delete all games
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], games.deleteAll);
  
    app.use('/api/games', router);
  };