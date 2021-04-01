module.exports = app => {
    const usersranks = require("../controllers/userranks.controller.js");
  
    // Create a new User
    app.post("/usersranks", usersranks.create);
  
    // Retrieve all usersranks
    app.get("/usersranks", usersranks.findAll);

    // Retrieve all ranks of a user with userId
    app.get("/usersranks/:userId", usersranks.findByUserId);
  
    // Retrieve a User rank with userId and gameId
    app.get("/usersranks/:userId/:gameId", usersranks.findByUserIdGameId);
  
    // Update a User rank with userId and gameId
    app.put("/usersranks/:userId/:gameId", usersranks.update);
  
    // Delete a User rank with userId and gameId
    app.delete("/usersranks/:userId/:gameId", usersranks.delete);
  
    // Delete all usersranks
    app.delete("/usersranks", usersranks.deleteAll);
  };