const db = require("../models");
const Tournament = db.tournament;
const Op = db.Sequelize.Op;

// Create and Save a new Tournament
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
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
    winner: req.body.winner,
    creator: req.body.creator
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

// Retrieve all Tournaments from the database.
exports.findAll = (req, res) => {
  var nome = req.query.nome
  var capacidade = req.query.capacidade
  var privado= req.query.privado

  var condition1 = false
  if (nome) {
    condition1 = true
  }

  var condition2 = false
  if (capacidade) {
    condition2 = true
  }


  var condition3 = false
  var privadoFinal
  if (privado) {
      condition3 = true
      privadoFinal = (privado === "true" ? true : false)
  }
  //condition3 ? {where: {private: privadoFinal}} : {}
  //{where: (condition2 ? {max_users: capacidade} : null) (condition3 ? {private: privadoFinal} : null) }
  Tournament.findAll( condition3 ? {where: {private: privadoFinal}} : {} )
    .then(data => {
      res.send(data);
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
      res.send(data);
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
};

// Delete a Tournament with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

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