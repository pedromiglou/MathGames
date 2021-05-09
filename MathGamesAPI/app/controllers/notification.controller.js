const db = require("../models");
const Notification = db.notifications;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Notification
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (req.body.sender !== req.userId) {
    res.status(401).send({
      message: "Unauthorized!"
    });
    return;
  }

  // Create a Notification
  const notification = {
    sender: req.body.sender,
    receiver: req.body.receiver,
    notification_type: req.body.notification_type
  };

  if (notification.notification_type === "F") {
    Notification.findOne({where: {
      sender: notification.sender,
      receiver: notification.receiver,
      notification_type: notification.notification_type
    }}).then(response => {
      if (response !== null) {
        res.status(405).send({
          message: "Friend Request already made."
        });
      } else {
        Notification.create(notification)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Notification."
          });
        });
      }
    })
  } else {
    // Save Notification in the database
    Notification.create(notification)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Notification."
        });
      });
  }
};

// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
  Notification.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Notifications."
      });
    });
};

// Find a single Notification with an id
exports.findByUserId = (req, res) => {
  const id = req.params.id;
  // SELECT Notifications.id, User.id as sender_id, username as sender, receiver, notification_type, notification_date 
  // FROM Notifications JOIN User ON sender = User.id WHERE receiver = ? ORDER BY notification_date desc

  if (parseInt(req.userId) !== parseInt(id)) {
    res.status(401).send({
      message: "Unauthorized!"
    });
    return;
  }

  Notification.findAll({attributes: ['id', 'receiver', 'notification_type', 'createdAt' ], 
                        where: {receiver: id}, include: [{model: User, as: 'sender_user', attributes: [['id', 'sender_id'], ['username', 'sender']], 
                        order: [["createdAt", 'DESC']] }]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error retrieving Notifications received by user id=" + id
      });
    });
};

// Delete a Notification with the specified two user ids
exports.delete = (req, res) => {
  const id = req.params.id;

  Notification.findOne({where: {id: id}}).then(notif => {
    if (parseInt(notif.receiver) !== parseInt(req.userId)) {
      res.status(401).send({
        message: "Unauthorized!"
      });
      return;
    } else {
      Notification.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Notification was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete Notification with id=${id}. Maybe Notification was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Notification with id=" + id
          });
        });

    }
  }).catch(err => {
    res.status(500).send({
        message: "Notification not found."
    })
});
};

// Delete all Notifications from the database.
exports.deleteAll = (req, res) => {
  Notification.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Notifications were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Notifications."
      });
    });
};