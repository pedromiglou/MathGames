const sql = require("./db.js");

// constructor
const Friend = function(friendship) {
  this.friend1 = friendship.friend1;
  this.friend2 = friendship.friend2;
};

Friend.create = (friend1, friend2, result) => {
  sql.query("INSERT INTO Friends SET friend1 = ?, friend2 = ?", [friend1, friend2], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(res);
    console.log("created Friendship: ", { friend1: friend1, friend2: friend2 });
    result(null, { friend1: friend1, friend2: friend2 });
  });
};

Friend.findByUserId = (user_id, result) => {
  sql.query('SELECT * FROM Friends WHERE friend1 = ? or friend2 = ?', [user_id, user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Friendship: ", res);
      result(null, res);
      return;
    }

    // not found Friendship with the user id
    result({ kind: "not_found" }, null);
  });
};

Friend.getAll = result => {
  sql.query("SELECT * FROM Friends", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Friends: ", res);
    result(null, res);
  });
};

Friend.remove = (friend1, friend2, result) => {
  sql.query("DELETE FROM Friends WHERE (friend1 = ? and friend2 = ?) or (friend1 = ? and friend2 = ?)", [friend1, friend2, friend2, friend1], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Ban with the user id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Friendship between user_id: ", friend1, " and user_id ", friend2);
    result(null, res);
  });
};

Friend.removeAll = result => {
  sql.query("DELETE FROM Friends", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Friends`);
    result(null, res);
  });
};

module.exports = Friend;