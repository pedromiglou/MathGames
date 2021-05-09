const { authJwt } = require("../middleware");

module.exports = app => {
    const notifications = require("../controllers/notification.controller.js");
    var router = require("express").Router();
  
    // Create a new notification
    router.post("/", authJwt.verifyToken, notifications.create);
  
    // Retrieve all notifications
    router.get("/", notifications.findAll);
  
    // Retrieve all notifications a userId has received
    router.get("/:id", authJwt.verifyToken, notifications.findByUserId);
  
    // Delete a notification
    router.delete("/:id", authJwt.verifyToken, notifications.delete);
  
    // Delete all notifications
    //router.delete("/", notifications.deleteAll);
  
    app.use('/api/notifications', router);
  };