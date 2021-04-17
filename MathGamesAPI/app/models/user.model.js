const sql = require("./db.js");
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');

const Role = require('../config/roles');
const { USER } = require("../config/db.config.js");

// constructor
const User = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
};



User.create = (newUser, result) => {
  sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created User: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (UserId, result) => {
  sql.query(`SELECT * FROM User WHERE id = ${sql.escape(UserId)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


User.findByUsername = (Username, result) => {
  sql.query(`SELECT * FROM User WHERE username = ${sql.escape(Username)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found User with the username
    result({ kind: "not_found" }, null);
  });
};


User.getAll = result => {
  sql.query("SELECT * FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE User SET username = ?, email = ?, password = ?, avatar = ?, ranking = ?, account_type = ? WHERE id = ?",
    [user.username, user.email, user.password, user.avatar, user.ranking, user.account_type, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

User.authenticate = (username, password, result) => {
  User.findByUsername(username, (err, user) => {
    if (!err){
      if (user.password === password) {
          const token = jwt.sign({ id: user.id, account_type: user.account_type }, config.secret);
          const { password, ...userWithoutPassword } = user;
          result(null,{
              ...userWithoutPassword,
              token
          });
      } else {
        result('Username or password is incorrect',null)
      }
    } else {
      result('Username or password is incorrect',null)
    }
  });
}



module.exports = User;

