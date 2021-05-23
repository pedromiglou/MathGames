const { authJwt } = require("../middleware");


module.exports = app => {
    const bans = require("../controllers/ban.controller.js");
    var router = require("express").Router();
  
    // Create a new Ban
    router.post("/",  [authJwt.verifyToken, authJwt.isAdmin],  bans.create);
  
    // Retrieve all bans
    router.get("/", bans.findAll);

    // Retrieve ban statistics
    router.get("/statistics", [authJwt.verifyToken, authJwt.isAdmin], bans.statistics)

    // Retrieve a single Ban with id
    router.get("/:id", bans.findOne);
  
    // Update a Ban with id
    router.put("/:id", bans.update);
  
    // Delete a Ban with id
    router.delete("/:id",  [authJwt.verifyToken, authJwt.isAdmin], bans.delete);
  
    // Delete all Bans
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], bans.deleteAll);
  
    app.use('/api/bans', router);
  };