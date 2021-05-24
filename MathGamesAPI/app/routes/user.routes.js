const authorize = require('../config/authorize')
const Role = require('../config/roles');
const { authJwt } = require("../middleware");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve ban statistics
    router.get("/statistics", users.statistics)

    // Retrieve all Users with Admin permissions
    router.get("/banned", [authJwt.verifyToken, authJwt.isAdmin], users.findAllBanned);
  
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", authJwt.verifyToken, users.update);

    // Upgrade user_account_type
    router.put("/upgrade/:id", [authJwt.verifyToken, authJwt.isAdmin], users.upgrade_account);

    // Downgrade user_account_type
    router.put("/downgrade/:id",  [authJwt.verifyToken, authJwt.isAdmin], users.downgrade_account);

    // Delete a User with id
    router.delete("/:id", users.delete);
  
    // Delete all Users
    router.delete("/", users.deleteAll);
  
    // Login
    router.post("/login", users.authenticate);

    // Register
    router.post("/register", users.register);




    router.get('/gamePage', authorize(Role.Admin), users.findAll);            // admin only
    router.get('/gamesDashboard', authorize(Role.User), users.findAll);       // all authenticated users

    app.use('/api/users', router);
  };