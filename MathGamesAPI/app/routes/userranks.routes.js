const { authJwt } = require("../middleware");

module.exports = app => {
    const usersranks = require("../controllers/userranks.controller.js");
    var router = require("express").Router();

    // Retrieve all usersranks
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin],  usersranks.findAll);
  
    // Retrieve percentage of ranks user with game id
    router.get("/statistics/:gameName", authJwt.verifyToken, usersranks.statistics);

    // Retrieve all ranks of a user with userId
    router.get("/:userId", authJwt.verifyToken, usersranks.findByUserId);
  
    // Delete a User rank with user id
    router.delete("/:userId", [authJwt.verifyToken, authJwt.isAdmin],  usersranks.delete); 
  
    // Delete all usersranks
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin],  usersranks.deleteAll); 
  
    app.use('/api/userranks', router);
  };