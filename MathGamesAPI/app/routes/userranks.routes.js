module.exports = app => {
    const usersranks = require("../controllers/userranks.controller.js");
    var router = require("express").Router();
  
    // Create a new User rank
    router.post("/", usersranks.create);
  
    // Retrieve all usersranks
    router.get("/", usersranks.findAll);
  
    // Retrieve all ranks of a user with userId
    router.get("/:userId", usersranks.findByUserId);
  
    // Retrieve a User rank with userId and gameId
    router.get("/:userId/:gameId", usersranks.findByUserIdGameId);

    // Update a User rank with userId and gameId
    router.put("/:userId/:gameId", usersranks.update);
  
    // Delete a Ban with id
    router.delete("/:userId/:gameId", usersranks.delete);
  
    // Delete all usersranks
    router.delete("/", usersranks.deleteAll);
  
    app.use('/api/userranks', router);
  };