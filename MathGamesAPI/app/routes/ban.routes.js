const { authJwt } = require("../middleware");


module.exports = app => {
    const bans = require("../controllers/ban.controller.js");
    var router = require("express").Router();
  
    // Create a new Ban
    router.post("/",  [authJwt.verifyToken, authJwt.isAdmin],  bans.create);
  
    // Retrieve all bans
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin],  bans.findAll);

    // Retrieve ban statistics
    router.get("/statistics", [authJwt.verifyToken, authJwt.isAdmin], bans.statistics);

    // Retrieve a single Ban with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin],  bans.findOne);
  
    // Update a Ban with id
    //router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin],  bans.update);
  
    // Delete all Bans
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], bans.deleteAll);

    // Delete a Ban with id
    router.delete("/:id",  [authJwt.verifyToken, authJwt.isAdmin], bans.delete);
  
    app.use('/api/bans', router);
  };