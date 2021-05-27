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