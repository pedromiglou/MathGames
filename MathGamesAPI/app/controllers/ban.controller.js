const Ban = require("../models/ban.model.js");

// Create and Save a new Ban
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Ban
  const ban = new Ban({
    reason: req.body.reason,
  });

  // Save Ban in the database
  Ban.create(ban, req.body.user_id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ban."
      });
    else res.send(data);
  });
};

// Retrieve all Bans from the database.
exports.findAll = (req, res) => {
  Ban.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the bans."
      });
    else res.send(data);
  });
};

// Find ban of a given userId
exports.findByUserId = (req, res) => {
  Ban.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ban with user id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Ban with user id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Update a Ban identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Ban.updateById(
    req.params.userId,
    new Ban(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ban with userId ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Ban with userId " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Ban with the specified userId in the request
exports.delete = (req, res) => {
  Ban.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ban with userId ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Ban with userId " + req.params.userId 
        });
      }
    } else res.send({ message: `Ban was deleted successfully!` });
  });
};

// Delete all Bans from the database.
exports.deleteAll = (req, res) => {
  Ban.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all bans."
      });
    else res.send({ message: `All Bans were deleted successfully!` });
  });
};