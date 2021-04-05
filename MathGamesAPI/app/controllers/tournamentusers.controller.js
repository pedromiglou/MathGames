const TournamentUser = require("../models/tournamentusers.model.js");

// Create and Save a new Tournament user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tournament User
  const tournamentuser = new TournamentUser({
    user_id: req.body.user_id,
    tournament_id: req.body.tournament_id,
    eliminated: req.body.eliminated
  });

  // Save Tournament Match in the database
  TournamentUser.create(tournamentuser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TournamentUser."
      });
    else res.send(data);
  });
};

// Retrieve all Tournament User from the database.
exports.findAll = (req, res) => {
  TournamentUser.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find all users of a tournament id
exports.findByTournamentId = (req, res) => {
  TournamentUser.findByTournamentId(req.params.tournamentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Users with tournament_id ${req.params.tournamentId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Users with tournament id " + req.params.tournamentId
        });
      }
    } else res.send(data);
  });
};

// Update a Match identified by the match_id
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  TournamentUser.updateByUserIdTournamentId(
    req.params.userId,
    req.params.tournamentId,
    req.body.eliminated,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId} and Tournament with id ${req.params.tournamentId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id" + req.params.userId + "and Tournament with id " + req.params.tournamentId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tournament User with the specified matchId in the request
exports.delete = (req, res) => {
  TournamentUser.remove(req.params.userId, req.params.tournamentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId} and Tournament with id ${req.params.tournamentId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id" + req.params.userId + "and Tournament with id " + req.params.tournamentId
        });
      }
    } else res.send({ message: `TournamentUser was deleted successfully!` });
  });
};

// Delete all Tournament Users from the database.
exports.deleteAll = (req, res) => {
  TournamentUser.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tournament users."
      });
    else res.send({ message: `All Tournament Users were deleted successfully!` });
  });
};