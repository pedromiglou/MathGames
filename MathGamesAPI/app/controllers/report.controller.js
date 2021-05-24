const db = require("../models");
const Report = db.report;
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new Report
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (parseInt(req.userId) !== parseInt(req.body.sender)) {
    res.status(403).send({
      message: "Unauthorized!"
    });
    return;
  }

  if (req.body.sender === req.body.receiver) {
    res.status(403).send({
      message: "User cannot report himself!"
    });
    return;
  }

  // Create a Report
  const report = {
    sender: req.body.sender,
    receiver: req.body.receiver,
    reason: req.body.reason
  };

  Report.findOne({where: {
      sender: req.body.sender,
      receiver: req.body.receiver,
      reason: req.body.reason
  }}).then(response => {
    if (response !== null) {
        res.status(405).send({
            message: "Report already made."
        });
    } else {
        // Save Report in the database
        Report.create(report)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Report."
            });
        });
    }
  }).catch(err => {
    res.status(500).send({
    message:
        err.message || "Some error occurred while creating the Report."
    });
  })
  
};

// Retrieve all Reports from the database.
exports.findAll = (req, res) => {
  Report.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Reports."
      });
    });
};

// Find all reports received by a user id
exports.findByUserId = (req, res) => {
  const id = req.params.id;

  Report.findAll({where: {receiver: id}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Reports for user id=" + id
      });
    });
};

// Delete a Ban with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Report.destroy({
    where: { id: id }
  })
    .then(num => {
        res.send({
            message: "Report was deleted successfully."
        });
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Report with id=" + id
      });
    });
};