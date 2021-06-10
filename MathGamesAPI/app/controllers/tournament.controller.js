const db = require("../models");
const Tournament = db.tournament;
const TournamentUsers = db.tournament_users;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tournaments } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tournaments, totalPages, currentPage };
};



// Create and Save a new Tournament
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (parseInt(req.body.creator) !== parseInt(req.userId) ) {
    res.status(401).send({
      message: "Unauthorized!"
    });
    return;
  }

  if (req.body.private === true && req.body.password === "") {
    res.status(400).send({
      message: "Private tournaments must have a password."
    });
    return;
  }

  // Create a Tournament
  const tournament = {
    name: req.body.name,
    max_users: req.body.max_users,
    private: req.body.private,
    password: req.body.password,
    game_id: req.body.game_id,
    creator: req.body.creator,
    status: "PREPARING"
  };

  // Save Tournament in the database
  Tournament.create(tournament)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tournament."
      });
    });
};


// Entrar num torneio
exports.entrarTorneio = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (parseInt(req.body.player) !== parseInt(req.userId) ) {
    res.status(401).send({
      message: "Unauthorized!"
    });
    return;
  }

  var torneioId = req.body.torneio
  var playerId = req.body.player

  Tournament.findByPk(torneioId)
    .then(data => {
      if (data.dataValues.status !== "PREPARING") {
        res.status(500).send({
          message: "The Tournament as started already."
        });
        return
      }

      if (parseInt(data.dataValues.creator) === parseInt(playerId)) {
        res.status(500).send({
          message: "The creator cannot join their tournaments."
        });
        return
      }

      if (data.dataValues.private) {
        var password = req.body.password

        if (data.dataValues.password !== password) {
          res.status(500).send({
            message: "Wrong password!"
          });
          return
        }      
      }
      TournamentUsers.findAll({where: {tournament_id: data.dataValues.id}}).then(tournament_users => {

          if (tournament_users.length < data.dataValues.max_users) {
            var tournamentuser = {
              user_id: playerId,
              tournament_id: torneioId,
              eliminated: false
            }
            // Save TournamentUser in the database
            TournamentUsers.create(tournamentuser)
              .then(tournament_user => {
                res.status(200).send({
                  message: "User joined the tournament with sucess!"
                });
              })
              .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while creating the TournamentUser."
                });
              });
          } else {
            res.status(500).send({
              message: "Tournament is full!"
            });
          }
      }).catch(err => {
        res.status(500).send({
          message: "An error occurred on the server. Operation was not concluded!"
        });
      });

    })
    .catch(err => {
      res.status(500).send({
        message: "An error occurred on the server. Operation was not concluded!"
      });
    });
};






// Retrieve all Tournaments from the database.
exports.findAll = (req, res) => {
  const { page, size } = req.query;

  const name = !req.query.name ? "": req.query.name+"%";

  const capacity = !req.query.capacity ? "%": req.query.capacity;

  var condition;
  if (req.query.private === "true") {
    condition = {private: true};
  } else if (req.query.private === "false") {
    condition = {private: false};
  } else {
    condition = {[Op.or]: [{private: true}, {private: false}] }
  }
  condition["name"] = { [Op.like]: `%${name}` };
  condition["max_users"] = { [Op.like]: `${capacity}` }

  const { limit, offset } = getPagination(page, size);
  Tournament.findAndCountAll({
                      where: condition,
                      limit, 
                      offset})
    .then(data => {
      if (data.length !== 0) {
        var tournament_ids = data.rows.map(element => {
          return element.id;
        });
      }

      TournamentUsers.findAll({where: {tournament_id: tournament_ids}}).then( tournament_users => {
        for (var tournament in data.rows) {
          let contador = 0;
          var indices = []
          for (var user in tournament_users ) {
            if (tournament_users[user].tournament_id === data.rows[tournament].id) {
              contador++;
              indices.push(user)
            }
          }
          for (var x = indices.length - 1; x >= 0; x--) {
            tournament_users.splice(indices[x], 1);
          }
          indices = [];
          data.rows[tournament].dataValues["usersCount"] = contador;
        }
        const response = getPagingData(data, page, limit);
        res.send(response);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Tournaments Users."
        });
      })
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tournaments."
      });
    });
};

// Find a single Tournament with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tournament.findByPk(id)
    .then(data => {
      const { password, ...tournamentWithoutPassword } = data.dataValues;
      res.send(tournamentWithoutPassword);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tournament with id=" + id
      });
    });
};

// Update a Tournament by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tournament.findByPk(id).then(tournament => {
    if (parseInt(tournament.dataValues.creator) !== parseInt(req.userId)) {
      if (req.account_type !== "A") {
        res.status(401).send({
          message: "Unauthorized!"
        });
        return;
      }
    }

    Tournament.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tournament was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tournament with id=${id}. Maybe Tournament was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tournament with id=" + id
        });
      });

  }).catch(err => {
    res.status(500).send({
      message: "Tournament not found."
    });
    return;
  })
};

// Delete a Tournament with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tournament.findByPk(id).then(tournament => {
    if (parseInt(tournament.dataValues.creator) !== parseInt(req.userId)) {
      if (req.account_type !== "A") {
        res.status(401).send({
          message: "Unauthorized!"
        });
        return;
      }
    }

    Tournament.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tournament was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tournament with id=${id}. Maybe Tournament was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tournament with id=" + id
        });
      });

  }).catch(err => {
    res.status(500).send({
      message: "Tournament not found."
    });
    return;
  })
};

// Delete all Tournaments from the database.
exports.deleteAll = (req, res) => {
  Tournament.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tournaments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Tournaments."
      });
    });
};