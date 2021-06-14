const db = require("../models");
const Tournament = db.tournament;
const TournamentUser = db.tournament_users;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new TournamentUser
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a TournamentUser
  const tournamentUser = {
    user_id: req.body.user_id,
    tournament_id: req.body.tournament_id,
    eliminated: req.body.eliminated
  };

  // Save TournamentUser in the database
  TournamentUser.create(tournamentUser)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TournamentUser."
      });
    });
};

// Retrieve all TournamentUsers from the database.
exports.findAll = (req, res) => {
  TournamentUser.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving TournamentUsers."
      });
    });
};

// Find users that belong to a tournament
exports.findUsersByTournament = (req, res) => {
  const id = req.params.id;

  TournamentUser.findAll({where: {tournament_id: id} })
    .then(async (data) =>  {
      var finalArray = []
      for (let player of data) {
        await User.findByPk(player.dataValues.user_id).then(user => {

          const { avatar_accessorie, avatar_color, avatar_hat, avatar_shirt, avatar_trouser, banned, createdAt, email, password, updatedAt, ...newUser } = user.dataValues;

          newUser["eliminated"] = player.dataValues.eliminated
          finalArray.push(newUser)
        }).catch(err => {
          res.status(500).send({
            message: "Error retrieving TournamentUser with tournament id=" + id
          });
        })
      }
      res.send(finalArray);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving TournamentUser with tournament id=" + id
      });
    });
};



// Find a tournaments that a User is in
exports.findTournamentsByUser = (req, res) => {
  const id = req.params.id;

  if (parseInt(id) !== parseInt(req.userId) ) {
    if (req.account_type !== "A") {
      res.status(401).send({
        message: "Unauthorized!"
      });
      return;
    }
  }

  TournamentUser.findAll({where: {user_id: id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving TournamentUser with user id=" + id
      });
    });
};



// Update a TournamentUser by the id in the request
exports.update = (req, res) => {
  const tournament_id = req.params.tournamentId;
  const user_id = req.params.userId;

  TournamentUser.update(req.body, {
    where: { tournament_id: tournament_id, user_id: user_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "TournamentUser was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update TournamentUser with id=${id}. Maybe TournamentUser was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating TournamentUser with id=" + id
      });
    });
};

// Delete a TournamentUser with the specified id in the request
exports.delete = (req, res) => {
  const tournament_id = req.params.tournamentId;
  const user_id = req.params.userId;
  Tournament.findByPk(tournament_id)
    .then(data => {


      if ( (parseInt(user_id) !== parseInt(req.userId)) && (req.account_type !== "A") && (parseInt(req.userId) !== data.dataValues.creator)) {
        res.status(401).send({
          message: "Unauthorized!"
        });
        return;
      }
    
      console.log("passei aut")
      if (data.dataValues.status !== "PREPARING") {
        res.status(500).send({
          message: "Can't leave tournament because tournament as already started."
        });
        return
      }

      TournamentUser.destroy({
        where: { tournament_id: tournament_id, user_id: user_id }
      })
      .then(num => {
        if (num == 1) {
          res.status(200).send({
            message: "TournamentUser was deleted successfully!"
          });
        } else {
          res.status(500).send({
            message: `Cannot delete TournamentUser with user id=${user_id} and tournament id=${tournament_id}. Maybe TournamentUser was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete TournamentUser with user id="+user_id+" and tournament id="+ tournament_id
        });
      });
  })
  .catch(err => {
    res.status(500).send({
      message: "An error occurred on the server. Operation was not concluded!"
    });
  });
};

// Delete all TournamentUseres from the database.
exports.deleteAll = (req, res) => {
  TournamentUser.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} TournamentUseres were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all TournamentUseres."
      });
    });
};