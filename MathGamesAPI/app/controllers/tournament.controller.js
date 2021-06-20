const db = require("../models");
const Tournament = db.tournament;
const TournamentUsers = db.tournament_users;
const TournamentMatch = db.tournament_matches;
const GameMatch = db.game_match;
const Sequelize = db.Sequelize;
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
exports.create = async (req, res) => {
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
    res.status(500).send({
      message: "Private tournaments must have a password."
    });
    return;
  }

  var resultado = await Tournament.findOne({where: {name: req.body.name}})
  if (resultado !== null) {
    res.status(400).send({
      message: "Tournament name is already in use!"
    });
    return
  }

  // Create a Tournament
  const tournament = {
    name: req.body.name,
    max_users: req.body.max_users,
    private: req.body.private,
    password: req.body.password,
    game_id: req.body.game_id,
    creator: req.body.creator,
    status: "PREPARING",
    current_round: 0
  };

  // Save Tournament in the database
  Tournament.create(tournament)
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: "Some error occurred while creating the TournamentUser."
      });
    });
};


// Entrar num torneio
exports.join = (req, res) => {
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





// Initialize tournamnet
exports.initialize = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  var torneioId = req.body.tournament_id

  Tournament.findByPk(torneioId)
    .then(torneio => {
      if (torneio.dataValues.status !== "PREPARING") {
        res.status(500).send({
          message: "The Tournament has started already."
        });
        return
      }

      if ( (parseInt(torneio.dataValues.creator) !== parseInt(req.userId))  && (req.account_type !== "A")) {
        res.status(500).send({
          message: "The tournament should be started by the creator or an admin."
        });
        return
      }

      TournamentUsers.findAll({where: {tournament_id: torneio.dataValues.id}}).then(async (tournament_users) => {

          if (tournament_users.length !== torneio.dataValues.max_users) {
            res.status(500).send({
              message: "The tournament need to be full to start."
            });
            return
          }
          
          var array_players_id = []
          for (let player of tournament_users) {
            array_players_id.push(player.dataValues.user_id)
          }

          var bracket = doBracket(torneio.dataValues.max_users, array_players_id)
          var match_id_translation = {}

          for (let game of bracket) {
            // Create a GameMatch
            const gameMatch = {
              player1: game.player1,
              player2: game.player2,
              winner: null,
              game_type: "online",
              game_id: torneio.dataValues.game_id,
            };

            // Save GameMatch in the database
            await GameMatch.create(gameMatch).then(game_match => {
              match_id_translation[game.matchNo] = game_match.dataValues.id
            }).catch(err => {
              res.status(500).send({
                message: "An error occurred on the server. Operation was not concluded!"
              });
            });
          }

          for (let game of bracket) {
            // Create a TournamentMatch
            const tournamentMatch = {
              match_id: match_id_translation[game.matchNo],
              tournament_id: torneio.dataValues.id,
              roundNo: game.roundNo,
              bye: game.bye,
              lastGame1: match_id_translation[game.lastGames1],
              lastGame2: match_id_translation[game.lastGames2],
              nextGame: match_id_translation[game.nextGame],
              player1: game.player1,
              player2: game.player2
            };

            // Save TournamentMatch in the database
            TournamentMatch.create(tournamentMatch)
              .catch(err => {
                res.status(500).send({
                  message: "An error occurred on the server. Operation was not concluded!"
                });
              });
          }
          

          Tournament.update( {status: "STARTED"}, {
            where: { id: torneio.dataValues.id }
          }).then(sucesso => {
            res.status(200).send(
              {message: "Tournament started with sucess!"}
            )
          }).catch(err => {
            res.status(500).send({
              message: "An error occurred on the server. Operation was not concluded!"
            });
          });


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



// Initialize tournamnet round
exports.initializeround = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  var torneioId = req.body.tournament_id

  Tournament.findByPk(torneioId)
    .then(torneio => {
      if (torneio.dataValues.status !== "STARTED") {
        res.status(500).send({
          message: "The Tournament have not started or have already finnished."
        });
        return
      }

      if ( (parseInt(torneio.dataValues.creator) !== parseInt(req.userId))  && (req.account_type !== "A")) {
        res.status(500).send({
          message: "The tournament round should be started by the creator or an admin."
        });
        return
      }

      if (parseInt(torneio.dataValues.current_round) === 0) {
        res.status(200).send({
          message: "The round can start"
        });
        return
      }
      
      TournamentMatch.findAll({where: {tournament_id: torneio.dataValues.id, roundNo: parseInt(torneio.dataValues.current_round)}}).then( async (tournament_matches) => {
        for (let game of tournament_matches) {
          await GameMatch.findByPk(game.dataValues.match_id).then(match => {
            if (match.dataValues.winner === null) {
              res.status(500).send({
                message: "Matches from previous round are still being played"
              });
              return
            }
          })
        }

        res.status(200).send({
          message: "The round can start"
        });

      }).catch(err => {
      res.status(500).send({
        message: "An error occurred on the server. Operation was not concluded!"
      });
    });

    }).catch(err => {
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

  const jogos = req.query.jogos
  
  var date = new Date();
  var last24hours = new Date(date.getTime() - (24 * 60 * 60 * 1000));
  last24hours.setTime( last24hours.getTime() - new Date().getTimezoneOffset()*60*1000 );
  var condition;
  var lastFinishedTournaments = [ {status: { [Op.ne]: "FINISHED" }}, { [Op.and]: [ {status: "FINISHED"} , {updatedAt: {[Op.gte]: last24hours} }] } ];
  if (req.query.private === "true") {
    condition = { [Op.or]: lastFinishedTournaments};
    condition = {private: true};
  } else if (req.query.private === "false") {
    condition = { [Op.or]: lastFinishedTournaments};
    condition = {private: false};
  } else {
    condition = { [Op.and]: [ {[Op.or]: [{private: true}, {private: false}] }, { [Op.or]: lastFinishedTournaments } ] };
  }
  
  condition["name"] = { [Op.like]: `%${name}` };
  condition["max_users"] = { [Op.like]: `${capacity}` }
  if (jogos !== undefined) {
    let arrayIds = jogos.split("-")
    arrayIds = arrayIds.map(function(e) { 
      return parseInt(e);
    });
    condition["game_id"] = arrayIds 
  }

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
      for (i = 0; i < data.rows.length ; i++) {
        const { password, ...tournamentWithoutPassword } = data.rows[i].dataValues;
        data.rows[i].dataValues = tournamentWithoutPassword;
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


// Find a single tournament by his name
exports.findByName = (req, res) => {
  const name = req.params.name;

  Tournament.findOne( {where: {name: name}})
    .then(data => {
      const { password, ...tournamentWithoutPassword } = data.dataValues;
      res.send(tournamentWithoutPassword);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tournament with name=" + name
      });
    });
};


// Find a single Tournament with an id
exports.findByCreator = (req, res) => {
  const creator_id = req.params.id;
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Tournament.findAndCountAll({where: {creator: creator_id}, limit, offset})
    .then(data => {
      if (data.length !== 0) {
        var tournament_ids = data.rows.map(element => {
          return element.id;
        });
      }
      for (i = 0; i < data.rows.length ; i++) {
        const { password, ...tournamentWithoutPassword } = data.rows[i].dataValues;
        data.rows[i].dataValues = tournamentWithoutPassword;
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
        message: "Error retrieving Tournaments that belong to creator with id=" + creator_id
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

    TournamentUsers.destroy({ where: {tournament_id: id}, truncate: false})
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tournament with id=" + id
        });
      });

    TournamentMatch.destroy({ where: {tournament_id: id}, truncate: false})
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tournament with id=" + id
        });
      });

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




//////
//
// Funçóes EXTRA
//
//////

function doBracket(base, players) {

  var knownBrackets = [2,4,8,16,32,64] // brackets with "perfect" proportions (full fields, no byes)
  //bracketCount = 0;
  shuffleArray(players)

  var closest 		= knownBrackets.filter(function (k) { return k>=base; }  ),
  byes 			= closest-base;
  
  if(byes>0)	base = closest;

  var brackets 	= [],
  round 		= 1,
  baseT 		= base/2,
  baseC 		= base/2,
  teamMark	= 0,
  nextInc		= base/2;
  
  for(i=1;i<=(base-1);i++) {
    var	baseR = i/baseT,
      isBye = false;

    if(byes>0 && (i%2!=0 || byes>=(baseT-i))) {
      isBye = true;
      byes--;
    }

    var filtrado = brackets.filter(bracketFilter)
    var last = filtrado.map(bracketMap)

    brackets.push({
      matchNo:	i,
      roundNo:	round,
      lastGames1:	round==1 ? null : last[0].game,
      lastGames2:	round==1 ? null : last[1].game,
      nextGame:	nextInc+i>base-1?null:nextInc+i,
      player1: round==1 ? players[teamMark] : null,
      player2: round==1 ? players[teamMark+1] : null,
      bye:		isBye
    });
    teamMark+=2;
    if(i%2!=0)	nextInc--;
    while(baseR>=1) {
      round++;
      baseC/= 2;
      baseT = baseT + baseC;
      baseR = i/baseT;
    }
  }

  return(brackets);
};

function bracketFilter (b) { return b.nextGame == i; }
function bracketMap (b) { return {game:b.matchNo,teams:b.teamnames} }


/* Randomize array */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}