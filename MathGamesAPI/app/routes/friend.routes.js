const { authJwt } = require("../middleware");

module.exports = app => {
    const friends = require("../controllers/friend.controller.js");
    var router = require("express").Router();
  
    // Create a new friendship
    router.post("/", authJwt.verifyToken, friends.create);
  
    // Retrieve all friends
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], friends.findAll);
  
    // Retrieve all friends of a userId
    router.get("/:id", authJwt.verifyToken, friends.findByUserId);
  
    // Delete a friendship of two users
    router.delete("/:friendId1/:friendId2", authJwt.verifyToken,  friends.delete);
  
    // Delete all friends
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], friends.deleteAll);
  
    app.use('/api/friends', router);
  };