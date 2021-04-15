const Tournament = require("../models/tournament.model.js");

// Create and Save a new Tournament
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tournament
  const tournament = new Tournament({
    name: req.body.name,
    max_users: req.body.max_users,
    private: req.body.private,
    password: req.body.password,
    game_id: req.body.game_id,
    winner: req.body.winner,
    creator: req.body.creator
  });

  // Save Tournament in the database
  Tournament.create(tournament, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tournament."
      });
    else res.send(data);
  });
};

// Retrieve all Tournaments from the database.
exports.findAll = (req, res) => {
  Tournament.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tournaments."
      });
    else res.send(data);
  });
};

// Find a single Tournament with a TournamentId
exports.findOne = (req, res) => {
  Tournament.findById(req.params.tournamentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tournament with id ${req.params.tournamentId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tournament with id " + req.params.tournamentId
        });
      }
    } else res.send(data);
  });
};

// Update a Tournament identified by the tournamentId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Tournament.updateById(
    req.params.tournamentId,
    new Tournament(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tournament with id ${req.params.tournamentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Tournament with id " + req.params.tournamentId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tournament with the specified tournamentId in the request
exports.delete = (req, res) => {
  Tournament.remove(req.params.tournamentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tournament with id ${req.params.tournamentId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tournament with id " + req.params.tournamentId
        });
      }
    } else res.send({ message: `Tournament was deleted successfully!` });
  });
};

// Delete all Tournament from the database.
exports.deleteAll = (req, res) => {
  Tournament.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tournaments."
      });
    else res.send({ message: `All Tournaments were deleted successfully!` });
  });
};