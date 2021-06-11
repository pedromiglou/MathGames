const db = require("../models");
const TournamentMatch = db.tournament_matches;
const Op = db.Sequelize.Op;

// Create and Save a new TournamentMatch
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a TournamentMatch
  const tournamentMatch = {
    match_id: req.body.match_id,
    tournament_id: req.body.tournament_id,
    roundNo: req.body.roundNo,
    bye: req.body.bye
  };

  // Save TournamentMatch in the database
  TournamentMatch.create(tournamentMatch)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TournamentMatch."
      });
    });
};

// Retrieve all TournamentMatches from the database.
exports.findAll = (req, res) => {
  TournamentMatch.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TournamentMatches."
      });
    });
};

// Find a single TournamentMatch with an id
exports.findMatchesByTournament = (req, res) => {
  const id = req.params.id;

  TournamentMatch.findAll({where: {tournament_id: id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving TournamentMatch with tournament id=" + id
      });
    });
};

// Update a TournamentMatch by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  TournamentMatch.update(req.body, {
    where: { match_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "TournamentMatch was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update TournamentMatch with id=${id}. Maybe TournamentMatch was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating TournamentMatch with id=" + id
      });
    });
};

// Delete a TournamentMatch with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  TournamentMatch.destroy({
    where: { match_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "TournamentMatch was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete TournamentMatch with id=${id}. Maybe TournamentMatch was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete TournamentMatch with id=" + id
      });
    });
};

// Delete all TournamentMatches from the database.
exports.deleteAll = (req, res) => {
  TournamentMatch.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} TournamentMatches were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all TournamentMatches."
      });
    });
};