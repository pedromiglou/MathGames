module.exports = app => {
    const bans = require("../controllers/ban.controller.js");
  
    // Create a new Ban
    app.post("/bans", bans.create);
  
    // Retrieve all Bans
    app.get("/bans", bans.findAll);
  
    // Retrieve a single Ban with userId
    app.get("/bans/:userId", bans.findByUserId);
  
    // Update a Ban with userId
    app.put("/bans/:userId", bans.update);
  
    // Delete a Ban with userId
    app.delete("/bans/:userId", bans.delete);
  
    // Delete all bans
    app.delete("/bans", bans.deleteAll);
  };