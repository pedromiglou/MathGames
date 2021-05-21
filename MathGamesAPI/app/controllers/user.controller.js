const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const config = require("../config/auth.config")
var jwt = require("jsonwebtoken");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, users, totalPages, currentPage };
};



// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAllBanned = (req, res) => {
  if (typeof req.query.orderby !== "undefined") {
    const { page, size } = req.query;
    const username = !req.query.username ? "": req.query.username+"%";
    const { limit, offset } = getPagination(page, size);
    User.findAndCountAll({attributes: ['id', 'username', 'account_level', 'account_type', 
                                       'avatar_color', 'avatar_hat', 'avatar_shirt', 'avatar_accessorie', 
                                       'avatar_trouser', 'banned'] , 
                          where: {username: { [Op.like]: `%${username}` }, banned: true }, 
                          order: [[req.query.orderby, 'DESC']], limit, offset})
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
  } else {
    User.findAll({attributes: ['username', 'account_level', 'account_type', 
                               'avatar_color', 'avatar_hat', 'avatar_shirt', 'avatar_accessorie', 
                               'avatar_trouser', 'banned'],
                  where: {banned: true}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  if (typeof req.query.orderby !== "undefined") {
    const { page, size } = req.query;
    const username = !req.query.username ? "": req.query.username+"%";
    const { limit, offset } = getPagination(page, size);
    User.findAndCountAll({attributes: ['id', 'username', 'account_level', 'account_type', 
                                        'avatar_color', 'avatar_hat', 'avatar_shirt', 'avatar_accessorie', 
                                        'avatar_trouser'] , 
                          where: {username: { [Op.like]: `%${username}` }, banned: false }, 
                          order: [[req.query.orderby, 'DESC']], limit, offset})
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
  } else {
    User.findAll({attributes: ['username', 'account_level', 'account_type', 
                                'avatar_color', 'avatar_hat', 'avatar_shirt', 'avatar_accessorie', 
                                'avatar_trouser'],
                  where: {banned: false}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      });
  }
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      const { password, ...userWithoutPassword } = data.dataValues;
      res.send(userWithoutPassword);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (parseInt(req.userId) !== parseInt(id)) {
    res.status(403).send({
      message: "Unauthorized!"
    });
    return;
  }

  const { account_type, banned, ...userWithoutAccount_Type } = req.body;


  User.update(userWithoutAccount_Type, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Upgrade a User_account_type by the id in the request
exports.upgrade_account = (req, res) => {
  const id = req.params.id;
  var new_type;
  User.findByPk(id).then(account => {
    if (account.account_type === "U")
      new_type = "T"
    if (account.account_type === "T")
      new_type = "A"
    if (account.account_type === "A")
      new_type = "A"

    User.update( {account_type: new_type}, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
    .catch(err1 => {
      res.status(500).send({
        message: "Error upgrading User with id=" + id
      });
    });
  }).catch(err2 => {
    res.status(500).send({
      message: "Error upgrading User with id=" + id
    });
  });


};

// Upgrade a User_account_type by the id in the request
exports.downgrade_account = (req, res) => {
  const id = req.params.id;
  var new_type;
  User.findByPk(id).then(account => {
    if (account.account_type === "U")
      new_type = "U"
    if (account.account_type === "T")
      new_type = "U"
    if (account.account_type === "A")
      new_type = "T"

    User.update( {account_type: new_type}, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
    .catch(err1 => {
      res.status(500).send({
        message: "Error upgrading User with id=" + id
      });
    });
  }).catch(err2 => {
    res.status(500).send({
      message: "Error upgrading User with id=" + id
    });
  });


};




// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

//
// Login
//
exports.authenticate = (req, res, next) => {
  authenticate(req.body.username, req.body.password).then(response => { 
    if (!response) {
      return res.status(403).send({msg: 'Username or password is incorrect'})
    } else {
      if (response["banned"])
        return res.status(403).send({msg: 'This account is banned'})
      else  {
        const { banned, ...userWithoutBanned } = response;
        return res.send(userWithoutBanned)
      }
    }
  })
}

const authenticate = (username, password) => {
  return new Promise((resolve, reject) => {
   try {
    User.findOne({
    where: {
     username: username // user email
    }
    }).then(async (response) => {
     if (!response) {
      resolve(false);
     } else {
       if (!response.dataValues.password || 
        !await response.validPassword(password.toString(), 
         response.dataValues.password)) {
          resolve(false);
       } else {
        const token = jwt.sign({ id: response.id, account_type: response.account_type }, config.secret, {expiresIn: 86400});
        const { password, ...userWithoutPassword } = response.dataValues;
        resolve({
            ...userWithoutPassword,
            token
        });
       }
      }
     })
    } catch (error) {
    const response = {
     status: 500,
     data: {},
    error: {
     message: "user match failed"
    }
    };
   reject(response);
   }
  })
 }


//
// Register
//
exports.register = (req, res) => {
  this.create(req, res)
}



