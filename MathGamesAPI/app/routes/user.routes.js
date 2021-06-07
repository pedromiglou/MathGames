const authorize = require('../config/authorize')
const Role = require('../config/roles');
const { authJwt, verifySignUp } = require("../middleware");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve ban statistics
    router.get("/statistics", [authJwt.verifyToken, authJwt.isAdmin], users.statistics)

    // Retrieve all Users with Admin permissions
    router.get("/banned", [authJwt.verifyToken, authJwt.isAdmin], users.findAllBanned);

    // Retrieve all Normal Users with Admin permissions
    router.get("/normal", [authJwt.verifyToken, authJwt.isAdmin], users.findAllNormal);

    // Retrieve all Privilege Users with Admin permissions
    router.get("/privilege", [authJwt.verifyToken, authJwt.isAdmin], users.findAllPrivilege);

    // Retrieve all Administrator Users with Admin permissions
    router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], users.findAllAdmin);

    // Retrieve all Users
    router.get("/username/:name", users.findByName);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", authJwt.verifyToken, users.update);

    // Upgrade user_account_type
    router.put("/upgrade/:id", [authJwt.verifyToken, authJwt.isAdmin], users.upgrade_account);

    // Downgrade user_account_type
    router.put("/downgrade/:id",  [authJwt.verifyToken, authJwt.isAdmin], users.downgrade_account);

    // Delete a User with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.delete);
  
    // Delete all Users
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], users.deleteAll);
  
    // Login
    router.post("/login", users.authenticate);

    // Register
    router.post("/register", verifySignUp.checkDuplicateUsernameOrEmail, users.create);

    //router.get('/gamePage', authorize(Role.Admin), users.findAll);            // admin only
    //router.get('/gamesDashboard', authorize(Role.User), users.findAll);       // all authenticated users

    app.use('/api/users', router);
  };