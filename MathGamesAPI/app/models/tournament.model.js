const sql = require("./db.js");

// constructor
const Tournament = function(tournament) {
  this.name = tournament.name;
  this.max_users = tournament.max_users;
  this.private = tournament.private;
  this.password = tournament.password;
  this.game_id = tournament.game_id;
  this.winner = tournament.winner;
  this.creator = tournament.creator;
};

Tournament.create = (newTournament, result) => {
  sql.query("INSERT INTO Tournament SET ?", newTournament, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tournament: ", { id: res.insertId, ...newTournament });
    result(null, { id: res.insertId, ...newTournament });
  });
};

Tournament.findById = (TournamentId, result) => {
  sql.query('SELECT * FROM Tournament WHERE id = ?', TournamentId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tournament: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tournament with the id
    result({ kind: "not_found" }, null);
  });
};

Tournament.getAll = result => {
  sql.query("SELECT * FROM Tournament", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Tournaments: ", res);
    result(null, res);
  });
};

Tournament.updateById = (id, tournament, result) => {
  sql.query(
    "UPDATE Tournament SET name = ?, max_users = ?, private = ?, password = ?, game_id = ?, winner = ?, creator = ? WHERE id = ?",
    [tournament.name, tournament.max_users, tournament.private, tournament.password, tournament.game_id, tournament.winner, tournament.creator, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found tournament with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tournament: ", { id: id, ...tournament });
      result(null, { id: id, ...tournament });
    }
  );
};

Tournament.remove = (id, result) => {
  sql.query("DELETE FROM Tournament WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found tournament with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tournament with id: ", id);
    result(null, res);
  });
};

Tournament.removeAll = result => {
  sql.query("DELETE FROM Tournament", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tournaments`);
    result(null, res);
  });
};

module.exports = Tournament;