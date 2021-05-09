const db = require("../models");
const GameMatch = db.game_match;
const Op = db.Sequelize.Op;

// Create and Save a new GameMatch
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a GameMatch
  const gameMatch = {
    player1: req.body.player1,
    player2: req.body.player2,
    winner: req.body.winner,
    game_type: req.body.game_type,
    game_id: req.body.game_id,
  };

  // Save GameMatch in the database
  GameMatch.create(gameMatch)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the GameMatch."
      });
    });
};

// Retrieve all GameMatchs from the database.
exports.findAll = (req, res) => {
  const user_id = req.query.userid;
  if (user_id !== null && parseInt(user_id) !== parseInt(req.userId)) {
    res.status(401).send({
      message: "Unauthorized!"
    });
    return;
  }
  var whereCondition = user_id ? { [Op.or]: [{ player1: user_id}, {player2: user_id} ] } : null;
  var limitCondition = user_id ? 5 : null;
  var orderCondition = user_id ?  [["createdAt", 'DESC']]  : null;
  GameMatch.findAll({ where: whereCondition, limit: limitCondition, order: orderCondition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving GameMatchs."
      });
    });
};

// Find a single GameMatch with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  GameMatch.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving GameMatch with id=" + id
      });
    });
};

// Update a GameMatch by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  GameMatch.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "GameMatch was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update GameMatch with id=${id}. Maybe GameMatch was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating GameMatch with id=" + id
      });
    });
};

// Delete a GameMatch with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  GameMatch.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "GameMatch was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete GameMatch with id=${id}. Maybe GameMatch was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete GameMatch with id=" + id
      });
    });
};

// Delete all GameMatchs from the database.
exports.deleteAll = (req, res) => {
  GameMatch.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} GameMatchs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all GameMatchs."
      });
    });
};
