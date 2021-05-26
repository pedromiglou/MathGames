module.exports = app => {
    const usersranks = require("../controllers/userranks.controller.js");
    var router = require("express").Router();

    // Retrieve all usersranks
    router.get("/", usersranks.findAll);
  
    // Retrieve all ranks of a user with userId
    router.get("/:userId", usersranks.findByUserId);
  
    // Delete a User rank with user id
    router.delete("/:userId", usersranks.delete); // is admin verification
  
    // Delete all usersranks
    router.delete("/", usersranks.deleteAll); // is admin verification
  
    app.use('/api/userranks', router);
  };