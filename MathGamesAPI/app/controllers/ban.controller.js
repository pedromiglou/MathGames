const db = require("../models");
const Ban = db.ban;
const User = db.user;
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
      User.update( {banned: true} , {where : {id: ban.user_id}}).then(user => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message: "Error occurred while updating the User."
        })
      })

    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Ban."
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
        message: err.message || "Some error occurred while retrieving Bans."
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

// Delete a Ban with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ban.destroy({
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        User.update( {banned: false} , {where : {id: id}}).then(user => {
          res.send({
            message: "Ban was deleted successfully."
          });
        }).catch(err => {
          res.status(500).send({
            message: "Error occurred while updating the User."
          })
        })
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
        message: err.message || "Some error occurred while removing all Bans."
      });
    });
};



// Retrieve statistics
exports.statistics = (req, res) => {

  var response = [0, 0, 0, 0, 0, 0, 0]
  var date = new Date();
  var last = new Date(date.getTime() - (6 * 24 * 60 * 60 * 1000));
  var dd = last.getDate();
  var mm = last.getMonth()+1;
  var yyyy = last.getFullYear();
  var setimoDiaDate = new Date(yyyy + '-' + mm + '-' + dd); 
  var sextoDia = new Date(yyyy + '-' + mm + '-' + dd);
  var quintoDia = new Date(yyyy + '-' + mm + '-' + dd);
  var quartoDia = new Date(yyyy + '-' + mm + '-' + dd);
  var terceiroDia = new Date(yyyy + '-' + mm + '-' + dd);
  var segundoDia = new Date(yyyy + '-' + mm + '-' + dd);
  var primeiroDia = new Date(yyyy + '-' + mm + '-' + dd);
  setimoDiaDate.setTime( setimoDiaDate.getTime() - new Date().getTimezoneOffset()*60*1000 );
  var setimoDia = setimoDiaDate.toISOString().slice(0, 19).replace('T', ' ');
  setimoDia = setimoDia.split(" ")[0]

  sextoDia.setDate(setimoDiaDate.getDate() + 1)
  sextoDia.setTime( sextoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  sextoDia = sextoDia.toISOString().slice(0, 19).replace('T', ' ');
  sextoDia = sextoDia.split(" ")[0]

  quintoDia.setDate(setimoDiaDate.getDate() + 2)
  quintoDia.setTime( quintoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  quintoDia = quintoDia.toISOString().slice(0, 19).replace('T', ' ');
  quintoDia = quintoDia.split(" ")[0]

  quartoDia.setDate(setimoDiaDate.getDate() + 3)
  quartoDia.setTime( quartoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  quartoDia = quartoDia.toISOString().slice(0, 19).replace('T', ' ');
  quartoDia = quartoDia.split(" ")[0]

  terceiroDia.setDate(setimoDiaDate.getDate() + 4);
  terceiroDia.setTime( terceiroDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  terceiroDia = terceiroDia.toISOString().slice(0, 19).replace('T', ' ');
  terceiroDia = terceiroDia.split(" ")[0]

  segundoDia.setDate(setimoDiaDate.getDate() + 5);
  segundoDia.setTime( segundoDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  segundoDia = segundoDia.toISOString().slice(0, 19).replace('T', ' ');
  segundoDia = segundoDia.split(" ")[0]

  primeiroDia.setDate(setimoDiaDate.getDate() + 6);
  primeiroDia.setTime( primeiroDia.getTime() - new Date().getTimezoneOffset()*60*1000 );
  primeiroDia = primeiroDia.toISOString().slice(0, 19).replace('T', ' ');
  primeiroDia = primeiroDia.split(" ")[0]

  Ban.findAll({where: { createdAt: {[Op.gte]: setimoDia} }})
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
        message: err.message || "Some error occurred while retrieving Bans statistics."
      });
    });
}