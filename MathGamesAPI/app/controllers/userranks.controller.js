const db = require("../models");
const UserRank = db.user_ranks;
const Op = db.Sequelize.Op;

// Create and Save a new UserRank
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a UserRank
  const userRank = {
    ranking: req.body.ranking,
    user_id: req.body.user_id,
    game_id: req.body.game_id
  };

  // Save UserRank in the database
  UserRank.create(userRank)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the UserRank."
      });
    });
};

// Retrieve all UserRanks from the database.
exports.findAll = (req, res) => {
  UserRank.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving UserRanks."
      });
    });
};

// Find all ranks of a given userId
exports.findByUserId = (req, res) => {
  const id = req.params.userId;

  UserRank.findAll({ where: {user_id: id}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving UserRank with id=" + id
      });
    });
};

// Find a single User Rank by a specific userId and gameId
exports.findByUserIdGameId = (req, res) => {
    const userId = req.params.userId;
    const gameId = req.params.gameId;
  
    UserRank.findAll({ where: [{user_id: userId}, {game_id: gameId} ]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving UserRank with user id=" + userId + " and game id=" + gameId
        });
      });
  };

// Update a UserRank identified by the userId and gameId in the request
exports.update = (req, res) => {
  const userId = req.params.userId;
  const gameId = req.params.gameId;

  UserRank.update(req.body, {
    where: [{ user_id: userId }, {game_id: gameId}]
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserRank was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update UserRank with user id=${userId} and game id=${gameId}. Maybe UserRank was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating UserRank with user id=" + userId + " and game id=" + gameId
      });
    });
};

// Delete a UserRank with the specified id in the request
exports.delete = (req, res) => {
  const userId = req.params.userId;
  const gameId = req.params.gameId;

  UserRank.destroy({
    where: [{ user_id: userId }, {game_id: gameId}]
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserRank was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete UserRank with user id=${userId} and game id=${gameId}. Maybe UserRank was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete UserRank with user id=" + userId + " and game id=" + gameId
      });
    });
};

// Delete all UserRanks from the database.
exports.deleteAll = (req, res) => {
  UserRank.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} UserRanks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all UserRanks."
      });
    });
};