const db = require("../models");
const GameMatch = db.game_match;
const Game = db.game;
const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

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
        message: err.message || "Some error occurred while creating the GameMatch."
      });
    });
};

// Retrieve all GameMatchs from the database.
exports.findAll = (req, res) => {
  const user_id = req.query.userid;

  

  if (user_id !== undefined && parseInt(user_id) !== parseInt(req.userId)) {
    res.status(401).send({
      message: "Unauthorized!"
    });
    return;
  }

  if (user_id === undefined && req.account_type !== "A") {
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
        message: err.message || "Some error occurred while retrieving GameMatchs."
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
        res.status(500).send({
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
        res.status(500).send({
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
        message: err.message || "Some error occurred while removing all GameMatchs."
      });
    });
};






// Retrieve all GameMatchs from the database.
exports.statisticsbygame = (req, res) => {
  var date = new Date();
  var last = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000));
  var dd = last.getDate();
  var mm = last.getMonth()+1;
  var yyyy = last.getFullYear();
  var setimoDia = new Date(yyyy + '-' + mm + '-' + dd);
  setimoDia.setTime( setimoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  setimoDia = setimoDia.toISOString().slice(0, 19).replace('T', ' ');
  setimoDia = setimoDia.split(" ")[0]

  Game.findAll({
    attributes: {include: [[Sequelize.fn("COUNT", Sequelize.col("GameMatches.id")), "matchesCount"]]},
    where: {"$GameMatches.createdAt$": {[Op.gte]: setimoDia}},
    include: [{
      model: GameMatch, attributes: []
    }],
    group: ['Games.id']
  })
    .then( matches => {
      var countAllMatches = 0;
      var countMatches = [];
      for (let match in matches) {
        countAllMatches += parseInt(matches[match].dataValues.matchesCount);
        countMatches.push({id: matches[match].dataValues.id, name: matches[match].dataValues.name, matchesCount: matches[match].dataValues.matchesCount})
      }
      for (var i = 0; i < countMatches.length; i++) {
        countMatches[i].matchesCount = (countMatches[i].matchesCount / countAllMatches) * 100;
      }
      res.send({matches: countMatches, countAllMatches: countAllMatches});
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving GameMatchs statisticsbygame."
      });
    })
};



// Retrieve statistics
exports.statistics = (req, res) => {
  var response = [0, 0, 0, 0, 0, 0, 0]
  var date = new Date();
  var last = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000));
  var dd = last.getDate();
  var mm = last.getMonth()+1;
  var yyyy = last.getFullYear();
  var setimoDia = new Date(yyyy + '-' + mm + '-' + dd);
  setimoDia.setTime( setimoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  setimoDia = setimoDia.toISOString().slice(0, 19).replace('T', ' ');
  setimoDia = setimoDia.split(" ")[0]

  var sextoDia = new Date(yyyy + '-' + mm + '-' + (dd+1));
  sextoDia.setTime( sextoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  sextoDia = sextoDia.toISOString().slice(0, 19).replace('T', ' ');
  sextoDia = sextoDia.split(" ")[0]

  var quintoDia = new Date(yyyy + '-' + mm + '-' + (dd+2));
  quintoDia.setTime( quintoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  quintoDia = quintoDia.toISOString().slice(0, 19).replace('T', ' ');
  quintoDia = quintoDia.split(" ")[0]

  var quartoDia = new Date(yyyy + '-' + mm + '-' + (dd+3));
  quartoDia.setTime( quartoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  quartoDia = quartoDia.toISOString().slice(0, 19).replace('T', ' ');
  quartoDia = quartoDia.split(" ")[0]

  var terceiroDia = new Date(yyyy + '-' + mm + '-' + (dd+4));
  terceiroDia.setTime( terceiroDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  terceiroDia = terceiroDia.toISOString().slice(0, 19).replace('T', ' ');
  terceiroDia = terceiroDia.split(" ")[0]

  var segundoDia = new Date(yyyy + '-' + mm + '-' + (dd+5));
  segundoDia.setTime( segundoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  segundoDia = segundoDia.toISOString().slice(0, 19).replace('T', ' ');
  segundoDia = segundoDia.split(" ")[0]

  var primeiroDia = new Date(yyyy + '-' + mm + '-' + (dd+6));
  primeiroDia.setTime( primeiroDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  primeiroDia = primeiroDia.toISOString().slice(0, 19).replace('T', ' ');
  primeiroDia = primeiroDia.split(" ")[0]

  GameMatch.findAll({where: { createdAt: {[Op.gte]: setimoDia} }})
    .then(data => {
      for (var element of data) {
        if (element.createdAt.split(" ")[0] === setimoDia)
          response[0] = response[0] + 1
        else if (element.createdAt.split(" ")[0] === sextoDia)
          response[1] = response[1] + 1
        else if (element.createdAt.split(" ")[0] === quintoDia)
          response[2] = response[2] + 1
        else if (element.createdAt.split(" ")[0] === quartoDia)
          response[3] = response[3] + 1
        else if (element.createdAt.split(" ")[0] === terceiroDia)
          response[4] = response[4] + 1
        else if (element.createdAt.split(" ")[0] === segundoDia)
          response[5] = response[5] + 1
        else if (element.createdAt.split(" ")[0] === primeiroDia)
          response[6] = response[6] + 1
      }
      res.send(response); 
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving GameMatchs statistics."
      });
    });
}