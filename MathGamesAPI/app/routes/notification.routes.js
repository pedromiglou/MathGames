module.exports = app => {
    const notifications = require("../controllers/notification.controller.js");
    var router = require("express").Router();
  
    // Create a new notification
    router.post("/", notifications.create);
  
    // Retrieve all notifications
    router.get("/", notifications.findAll);
  
    // Retrieve all notifications a userId has received
    router.get("/:id", notifications.findByUserId);
  
    // Delete a notification
    router.delete("/:id", notifications.delete);
  
    // Delete all notifications
    //router.delete("/", notifications.deleteAll);
  
    app.use('/api/notifications', router);
  };