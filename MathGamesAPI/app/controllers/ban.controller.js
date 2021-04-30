const db = require("../models");
const Ban = db.ban;
const Op = db.Sequelize.Op;

// Create and Save a new Ban
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Ban
  const ban = {
    reason: req.body.reason,
    user_id: req.body.user_id
  };

  // Save Ban in the database
  Ban.create(ban)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ban."
      });
    });
};

// Retrieve all Bans from the database.
exports.findAll = (req, res) => {
  Ban.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Bans."
      });
    });
};

// Find a single Ban with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ban.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Ban with id=" + id
      });
    });
};

// Update a Ban by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Ban.update(req.body, {
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ban was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Ban with id=${id}. Maybe Ban was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Ban with id=" + id
      });
    });
};

// Delete a Ban with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ban.destroy({
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Ban was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Ban with id=${id}. Maybe Ban was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Ban with id=" + id
      });
    });
};

// Delete all Bans from the database.
exports.deleteAll = (req, res) => {
  Ban.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Bans were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Bans."
      });
    });
};