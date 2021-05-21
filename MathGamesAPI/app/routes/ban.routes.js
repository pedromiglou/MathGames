const { authJwt } = require("../middleware");


module.exports = app => {
    const bans = require("../controllers/ban.controller.js");
    var router = require("express").Router();
  
    // Create a new Ban
    router.post("/",  authJwt.verifyToken,  bans.create);   //VERIFY IS ADMIN
  
    // Retrieve all bans
    router.get("/", bans.findAll);
  
    // Retrieve a single Ban with id
    router.get("/:id", bans.findOne);
  
    // Update a Ban with id
    router.put("/:id", bans.update);
  
    // Delete a Ban with id
    router.delete("/:id",  authJwt.verifyToken, bans.delete);   //VERIFY IS ADMIN
  
    // Delete all Bans
    router.delete("/", bans.deleteAll);
  
    app.use('/api/bans', router);
  };