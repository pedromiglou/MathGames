const sql = require("./db.js");

// constructor
const Ban = function(ban) {
  this.reason = ban.reason;
};

Ban.create = (newBan, user_id, result) => {
  sql.query("INSERT INTO Bans SET user_id = ?, reason = ?", [user_id, newBan.reason], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Ban: ", { user_id: user_id, ...newBan });
    result(null, { user_id: user_id, ...newBan });
  });
};

Ban.findByUserId = (user_id, result) => {
  sql.query('SELECT * FROM Bans WHERE user_id = ?', user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Ban: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Ban with the user id
    result({ kind: "not_found" }, null);
  });
};

Ban.getAll = result => {
  sql.query("SELECT * FROM Bans", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Bans: ", res);
    result(null, res);
  });
};

Ban.updateById = (user_id, ban, result) => {
  sql.query(
    "UPDATE Bans SET reason = ? WHERE user_id = ?",
    [ban.reason, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Ban with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Ban: ", { user_id: user_id, ...ban });
      result(null, { user_id: user_id, ...ban });
    }
  );
};

Ban.remove = (user_id, result) => {
  sql.query("DELETE FROM Bans WHERE user_id = ?", user_id, (err, res) => {
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

    console.log("deleted Bans with user_id: ", user_id);
    result(null, res);
  });
};

Ban.removeAll = result => {
  sql.query("DELETE FROM Bans", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Bans`);
    result(null, res);
  });
};

module.exports = Ban;