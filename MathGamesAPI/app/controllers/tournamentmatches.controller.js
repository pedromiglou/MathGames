const TournamentMatch = require("../models/tournamentmatches.model.js");

// Create and Save a new Tournament match
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tournament Match
  const tournamentmatch = new TournamentMatch({
    match_id: req.body.match_id,
    tournament_id: req.body.tournament_id
  });

  // Save Tournament Match in the database
  TournamentMatch.create(tournamentmatch, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TournamentMatch."
      });
    else res.send(data);
  });
};

// Retrieve all Tournament Matches from the database.
exports.findAll = (req, res) => {
  TournamentMatch.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single Match with a userId
exports.findByTournamentId = (req, res) => {
  TournamentMatch.findByTournamentId(req.params.tournamentId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Matches with tournament_id ${req.params.tournamentId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Matches with tournament id " + req.params.tournamentId
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

  TournamentMatch.updateByMatchId(
    req.params.matchId,
    req.body.tournament_id,
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
  TournamentMatch.remove(req.params.matchId, (err, data) => {
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

// Delete all Tournament Matches from the database.
exports.deleteAll = (req, res) => {
  TournamentMatch.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tournament matches."
      });
    else res.send({ message: `All Tournament Matches were deleted successfully!` });
  });
};