module.exports = app => {
    const friends = require("../controllers/friend.controller.js");
  
    // Create a new friendship
    app.post("/friends", friends.create);
  
    // Retrieve all friends
    app.get("/friends", friends.findAll);
  
    // Retrieve all friends of a userId
    app.get("/friends/:userId", friends.findByUserId);
  
    // Delete a friendship of two users
    app.delete("/friends/:friendId1/:friendId2", friends.delete);
  
    // Delete all friends
    app.delete("/friends", friends.deleteAll);
  };