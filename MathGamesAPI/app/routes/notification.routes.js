module.exports = app => {
    const notifications = require("../controllers/notification.controller.js");
  
    // Create a new notification
    app.post("/notifications", notifications.create);
  
    // Retrieve all notifications
    app.get("/notifications", notifications.findAll);
  
    // Retrieve all notifications a userId has received
    app.get("/notifications/:userId", notifications.findByUserId);
  
    // Delete a notificationship of two users
    app.delete("/notifications/:notificationId", notifications.delete);
  
    // Delete all notifications
    app.delete("/notifications", notifications.deleteAll);
  };