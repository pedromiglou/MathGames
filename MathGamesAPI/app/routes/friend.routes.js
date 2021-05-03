module.exports = app => {
    const friends = require("../controllers/friend.controller.js");
    var router = require("express").Router();
  
    // Create a new friendship
    router.post("/", friends.create);
  
    // Retrieve all friends
    router.get("/", friends.findAll);
  
    // Retrieve all friends of a userId
    router.get("/:id", friends.findByUserId);
  
    // Delete a friendship of two users
    router.delete("/:friendId1/:friendId2", friends.delete);
  
    // Delete all friends
    router.delete("/", friends.deleteAll);
  
    app.use('/api/friends', router);
  };