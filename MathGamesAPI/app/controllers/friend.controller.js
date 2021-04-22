const Friend = require("../models/friend.model.js");

// Create and Save a new Friend
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var friend = null;
  // Create a Friend
  if (req.body.friend1 > req.body.friend2) {
    friend = new Friend({
      friend1: req.body.friend2,
      friend2: req.body.friend1
    });
  } else {
    friend = new Friend({
      friend1: req.body.friend1,
      friend2: req.body.friend2
    });
  }

  // Save Friend in the database
  Friend.create(friend.friend1, friend.friend2, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Friend."
      });
    else res.send(data);
  });
};

// Retrieve all Bans from the database.
exports.findAll = (req, res) => {
  Friend.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the friends."
      });
    else res.send(data);
  });
};

// Find friends of a given userId
exports.findByUserId = (req, res) => {
  Friend.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Friends with user id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Friends with user id " + req.params.userId
        });
      }
    } else {
      res.send(data);
      /* See what is the better way to do this. In the model or in the controller ? For now is in the controller but this code is also working
      
      sql.query('SELECT id, username, avatar, account_level FROM User WHERE id in (?)', [data], (err, res_final) => {
        console.log("friends of user ", req.params.userId, ": ", res_final);
        res.send(res_final);
      });
      */
    }

  });
};

// Delete a Friend with the specified two user ids
exports.delete = (req, res) => {
  Friend.remove(req.params.friendId1, req.params.friendId2, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Friendship with userId ${req.params.friendId1} and userId ${req.params.friendId2}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Friendship with userId " + req.params.friendId1 + " and userId " + req.params.friendId2
        });
      }
    } else res.send({ message: `Friendship was deleted successfully!` });
  });
};

// Delete all Friends from the database.
exports.deleteAll = (req, res) => {
  Friend.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all friendships."
      });
    else res.send({ message: `All Friends were deleted successfully!` });
  });
};