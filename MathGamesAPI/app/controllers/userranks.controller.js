const UserRank = require("../models/userranks.model.js");

// Create and Save a new UserRank
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a UserRank
  const userrank = new UserRank({
    rank: req.body.rank,
  });

  // Save UserRank in the database
  UserRank.create(userrank, req.body.user_id, req.body.game_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserRank."
      });
    else res.send(data);
  });
};

// Retrieve all UsersRanks from the database.
exports.findAll = (req, res) => {
  UserRank.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users ranks."
      });
    else res.send(data);
  });
};

// Find all ranks of a given userId
exports.findByUserId = (req, res) => {
  UserRank.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User Rank with user id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User Rank with user id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Find a single User Rank by a specific userId and gameId
exports.findByUserIdGameId = (req, res) => {
    UserRank.findByUserIdGameId(req.params.userId, req.params.gameId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User Rank with user_id ${req.params.userId} and game_id ${req.params.gameId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User Rank with user_id " + req.params.userId + " game_id " + req.params.gameId
          });
        }
      } else res.send(data);
    });
  };



// Update a UserRank identified by the userId and gameId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  UserRank.updateByUserIdGameId(
    req.params.userId,
    req.params.gameId,
    new UserRank(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User Rank with userId ${req.params.userId} and gameId ${req.params.gameId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User Rank with userId " + req.params.userId + " gameId " + req.params.gameId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User Rank with the specified userId and gameId in the request
exports.delete = (req, res) => {
  UserRank.remove(req.params.userId, req.params.gameId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User Rank with userId ${req.params.userId} and gameId ${req.params.gameId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User Rank with userId " + req.params.userId + " gameId " + req.params.gameId
        });
      }
    } else res.send({ message: `UserRank was deleted successfully!` });
  });
};

// Delete all UsersRanks from the database.
exports.deleteAll = (req, res) => {
  UserRank.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users ranks."
      });
    else res.send({ message: `All Users Ranks were deleted successfully!` });
  });
};