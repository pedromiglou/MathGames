const db = require("../models");
const Friend = db.friend;
const User = db.user;
const Notification = db.notifications;
const Op = db.Sequelize.Op;

// Create and Save a new Friend
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (parseInt(req.userId) !== parseInt(req.body.friend1) && parseInt(req.userId) !== parseInt(req.body.friend2)) {
    res.status(403).send({
      message: "Unauthorized!"
    });
    return;
  }

  var friend = null;
  // Create a Friend
  if (req.body.friend1 > req.body.friend2) {
    friend = {
      friend1: req.body.friend2,
      friend2: req.body.friend1
    };
  } else {
    friend = {
      friend1: req.body.friend1,
      friend2: req.body.friend2
    };
  }

  Notification.findOne({where: { [Op.or]: [ {sender: req.body.friend1, receiver: req.body.friend2, notification_type: "F"}, {sender: req.body.friend2, receiver: req.body.friend1, notification_type: "F"} ]} })
  .then( notif => {
    if (notif !== null) {
      Notification.destroy({where: {id: notif.id}});
      // Save Friend in the database
      console.log(friend)
      Friend.create(friend)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Friend."
        });
      });
    } else {
      res.status(403).send({
        message:
          "Friend Request doesn't exists."
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Friend Request not found."
    });
  })

};

// Retrieve all Friends from the database.
exports.findAll = (req, res) => {
  Friend.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Friends."
      });
    });
};

// Find friends of a given userId
exports.findByUserId = (req, res) => {
  const id = req.params.id;
  if (req.userId !== parseInt(id)) {
    res.status(403).send({
      message: "Unauthorized!"
    });
    return;
  }
  Friend.findAll({ where: { [Op.or]: [{ friend1: id}, {friend2: id} ] }})
  .then(data => {
      if (data.length !== 0) {
        var data = data.map(element => {
          if (element.friend1 !== parseInt(id)) {
            return element.friend1;
          } else {
            return element.friend2;
          }
        });

        User.findAll({attributes: ['id', 'username', 'avatar_color', 'avatar_hat', 'avatar_shirt', 'avatar_accessorie', 'avatar_trouser', 'account_level', 'account_type'], where: {id: data} })
        .then( users => {
          res.send(users)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retreving users."
            })
        })
      }
      else {
        res.send([]);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Friend with id=" + id
      });
    });
};

// Delete a Friend with the specified id in the request
exports.delete = (req, res) => {
  const friendId1 = req.params.friendId1;
  const friendId2 = req.params.friendId2;

  Friend.destroy({
    where: { [Op.or]: [{ [Op.and]: [{friend1: friendId1, friend2: friendId2}]}, {[Op.and]: [{friend2: friendId1, friend1: friendId2}] }] }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Friendship was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Friendship between with id=${friendId1} and id=${friendId2}. Maybe Friendship was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Friendship between with id=${friendId1} and id=${friendId2}`
      });
    });
};

// Delete all Friends from the database.
exports.deleteAll = (req, res) => {
  Friend.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Friends were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Friends."
      });
    });
};
