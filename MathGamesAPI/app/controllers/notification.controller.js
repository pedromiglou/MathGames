const Notification = require("../models/notification.model.js");

// Create and Save a new Notification
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var notification = new Notification({
    sender: req.body.sender,
    receiver: req.body.receiver,
    notification_type: req.body.notification_type,
    notification_date: req.body.notification_date
  });

  // Save Notification in the database
  Notification.create(notification, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Notification."
      });
    else res.send(data);
  });
};

// Retrieve all Bans from the database.
exports.findAll = (req, res) => {
  Notification.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Notifications."
      });
    else res.send(data);
  });
};

// Find Notifications of a given userId
exports.findByUserId = (req, res) => {
  Notification.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Notifications with receiver id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Notifications with receiver id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Delete a Notification with the specified two user ids
exports.delete = (req, res) => {
  Notification.remove(req.params.notificationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Notification with id ${req.params.notificationId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Notification with id " + req.params.notificationId
        });
      }
    } else res.send({ message: `Notification was deleted successfully!` });
  });
};

// Delete all Notifications from the database.
exports.deleteAll = (req, res) => {
  Notification.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all notifications."
      });
    else res.send({ message: `All Notifications were deleted successfully!` });
  });
};