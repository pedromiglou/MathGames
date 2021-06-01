const db = require("../models");
const UserRank = db.user_ranks;
const Op = db.Sequelize.Op;

// Retrieve all UserRanks from the database.
exports.findAll = (req, res) => {
  UserRank.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving UserRanks."
      });
    });
};

// Find all ranks of a given userId
exports.findByUserId = (req, res) => {
  const id = req.params.userId;

  if (req.userId !== parseInt(id)) {
    res.status(401).send({
      message: "Unauthorized!"
    });
    return;
  }

  UserRank.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving UserRank with id=" + id
      });
    });
};

// Delete a UserRank with the specified id in the request
exports.delete = (req, res) => {
  const userId = req.params.userId;

  UserRank.destroy({
    where: { user_id: userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "UserRank was deleted successfully!"
        });
      } else {
        res.status(500).send({
          message: `Cannot delete UserRank with user id=${userId}. Maybe UserRank was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete UserRank with user id=" + userId 
      });
    });
};

// Delete all UserRanks from the database.
exports.deleteAll = (req, res) => {
  UserRank.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} UserRanks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all UserRanks."
      });
    });
};


// Retrieve percentage of ranks by a game id.
exports.statistics = (req, res) => {
  const game_name = req.params.gameName;

  UserRank.findAll()
    .then(data => {
      var response = [];
      var total_userranks = data.length;
      var userrankselo = [0, 26, 76, 176, 276, 401, 551, 701, 851, 1051, 1251, 1451, 1701, 2147483647];
      for (var i = 0; i < userrankselo.length - 1; i++) {
        response[i] = 0;
        var minimo = userrankselo[i];
        var maximo = userrankselo[i+1];
        var indices = []
        data.forEach( (rank, index) => {
          if ( ( minimo <= rank.dataValues[game_name]) && (rank.dataValues[game_name] < maximo)) {
            response[i]++; 
            indices.push(index)
          }
        })
        for (var x = indices.length - 1; x >= 0; x--) {
          data.splice(indices[x], 1);
        }
        indices = [];
      }
      for (var i = 0; i < response.length; i++) {
        response[i] = (response[i] / total_userranks) * 100;
      }
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving UserRanks."
      });
    });
};