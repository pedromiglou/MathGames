module.exports = app => {
    const bans = require("../controllers/ban.controller.js");
    var router = require("express").Router();
  
    // Create a new Ban
    router.post("/", bans.create);
  
    // Retrieve all bans
    router.get("/", bans.findAll);
  
    // Retrieve a single Ban with id
    router.get("/:id", bans.findOne);
  
    // Update a Ban with id
    router.put("/:id", bans.update);
  
    // Delete a Ban with id
    router.delete("/:id", bans.delete);
  
    // Delete all Bans
    router.delete("/", bans.deleteAll);
  
    app.use('/api/bans', router);
  };