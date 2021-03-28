const GameMatch = require("../models/gamematch.model.js");

// Create and Save a new Match
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Match
  const match = new GameMatch({
    player1: req.body.player1,
    player2: req.body.player2,
    winner: req.body.winner,
    number_moves: req.body.number_moves,
    game_type: req.body.game_type,
    game_id: req.body.game_id,
    actual_state: req.body.actual_state
  });

  // Save Match in the database
  GameMatch.create(match, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Match."
      });
    else res.send(data);
  });
};

// Retrieve all Games from the database.
exports.findAll = (req, res) => {
  GameMatch.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Games."
      });
    else res.send(data);
  });
};

// Find a single Match with a MatchId
exports.findOne = (req, res) => {
  GameMatch.findById(req.params.matchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Match with id ${req.params.matchId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Match with id " + req.params.matchId
        });
      }
    } else res.send(data);
  });
};

// Update a Match identified by the matchId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  GameMatch.updateById(
    req.params.matchId,
    new GameMatch(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Match with id ${req.params.matchId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Match with id " + req.params.matchId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Match with the specified matchId in the request
exports.delete = (req, res) => {
  GameMatch.remove(req.params.matchId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Match with id ${req.params.matchId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Match with id " + req.params.matchId
        });
      }
    } else res.send({ message: `Match was deleted successfully!` });
  });
};

// Delete all Matches from the database.
exports.deleteAll = (req, res) => {
  GameMatch.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all matches."
      });
    else res.send({ message: `All Matches were deleted successfully!` });
  });
};