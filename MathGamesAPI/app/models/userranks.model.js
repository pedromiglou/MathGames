const sql = require("./db.js");

// constructor
const UserRank = function(userrank) {
  this.rank = userrank.rank;
};

UserRank.create = (newUserRank, user_id, game_id, result) => {
  sql.query("INSERT INTO UserHasRank SET user_id = ?, game_id = ?, rank = ?", [user_id ,game_id , newUserRank.rank], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created UserHasRank: ", { user_id: user_id, game_id: game_id, ...newUserRank });
    result(null, { user_id: user_id, game_id: game_id, ...newUserRank });
  });
};

UserRank.findByUserId = (UserId, result) => {
  sql.query('SELECT * FROM UserHasRank WHERE user_id = ?', UserId , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      console.log("found user ranks: ", res);
      result(null, res);
      return;
    }

    // not found UserRank with the id
    result({ kind: "not_found" }, null);
  });
};

UserRank.findByUserIdGameId = (UserId, GameId, result) => {
    sql.query('SELECT * FROM UserHasRank WHERE user_id = ? and game_id = ?', [UserId, GameId] , (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user rank: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found UserRank with the id
      result({ kind: "not_found" }, null);
    });
  };

UserRank.getAll = result => {
  sql.query("SELECT * FROM UserHasRank", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users ranks: ", res);
    result(null, res);
  });
};

UserRank.updateByUserIdGameId = (user_id, game_id, newUserRank, result) => {
  sql.query(
    "UPDATE UserHasRank SET rank = ? WHERE user_id = ? and game_id = ?",
    [newUserRank.rank, user_id, game_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User Rank with the User id and Game id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated UserHasRank: ", { user_id: user_id, game_id: game_id, ...newUserRank });
      result(null, { user_id: user_id, game_id: game_id, ...newUserRank });
    }
  );
};

UserRank.remove = (user_id, game_id, result) => {
  sql.query("DELETE FROM UserHasRank WHERE user_id = ? and game_id = ?", [user_id, game_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User rank with the user id and game id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user rank with user_id: ", user_id, " and game_id: ", game_id);
    result(null, res);
  });
};

UserRank.removeAll = result => {
  sql.query("DELETE FROM UserHasRank", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users ranks`);
    result(null, res);
  });
};

module.exports = UserRank;