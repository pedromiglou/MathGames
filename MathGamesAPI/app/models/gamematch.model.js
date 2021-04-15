const sql = require("./db.js");

// constructor
const GameMatch = function(match) {
  this.player1 = match.player1;
  this.player2 = match.player2;
  this.winner = match.winner;
  this.number_moves = match.number_moves;
  this.game_type = match.game_type;
  this.game_id = match.game_id;
  this.actual_state = match.actual_state;
};

GameMatch.create = (newMatch, result) => {
  sql.query("INSERT INTO GameMatch SET ?", newMatch, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created match: ", { id: res.insertId, ...newMatch });
    result(null, { id: res.insertId, ...newMatch });
  });
};

GameMatch.findById = (MatchId, result) => {
  sql.query(`SELECT * FROM GameMatch WHERE id = ${sql.escape(MatchId)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found match: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found GameMatch with the id
    result({ kind: "not_found" }, null);
  });
};

GameMatch.getAll = result => {
  sql.query("SELECT * FROM GameMatch", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("GameMatches: ", res);
    result(null, res);
  });
};

GameMatch.updateById = (id, match, result) => {
  sql.query(
    "UPDATE GameMatch SET player1 = ?, player2 = ?, winner = ?, number_moves = ?, game_type = ?, game_id = ?, actual_state = ? WHERE id = ?",
    [match.player1, match.player2, match.winner, match.number_moves, match.game_type, match.game_id, match.actual_state, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found match with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated match: ", { id: id, ...match });
      result(null, { id: id, ...match });
    }
  );
};

GameMatch.remove = (id, result) => {
  sql.query("DELETE FROM GameMatch WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found match with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted match with id: ", id);
    result(null, res);
  });
};

GameMatch.removeAll = result => {
  sql.query("DELETE FROM GameMatch", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} matches`);
    result(null, res);
  });
};

module.exports = GameMatch;