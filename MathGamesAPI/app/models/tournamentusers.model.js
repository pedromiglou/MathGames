const sql = require("./db.js");

// constructor
const TournamentUser = function(tournamentuser) {
  this.user_id = tournamentuser.user_id;
  this.tournament_id = tournamentuser.tournament_id;
  this.eliminated = tournamentuser.eliminated;
};

TournamentUser.create = (tournamentuser, result) => {
  sql.query("INSERT INTO TournamentUsers SET user_id = ?, tournament_id = ?, eliminated = ?", [tournamentuser.user_id , tournamentuser.tournament_id, tournamentuser.eliminated], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created TournamentUsers: ", { user_id: tournamentuser.user_id, tournament_id: tournamentuser.tournament_id, eliminated: tournamentuser.eliminated });
    result(null, { user_id: tournamentuser.user_id, tournament_id: tournamentuser.tournament_id, eliminated: tournamentuser.eliminated });
  });
};

TournamentUser.findByTournamentId = (TournamentId, result) => {
  sql.query('SELECT * FROM TournamentUsers WHERE tournament_id = ?', TournamentId , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      console.log("found users: ", res);
      result(null, res);
      return;
    }

    // not found Users for tournament id
    result({ kind: "not_found" }, null);
  });
};

TournamentUser.getAll = result => {
  sql.query("SELECT * FROM TournamentUsers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tournament matches: ", res);
    result(null, res);
  });
};

TournamentUser.updateByUserIdTournamentId = (user_id, tournament_id, eliminated, result) => {
  sql.query(
    "UPDATE TournamentUsers SET eliminated = ? WHERE user_id = ? and tournament_id = ?",
    [eliminated, user_id, tournament_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User Tournament with the user id and tournament id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated TournamentUsers: ", { user_id: user_id, tournament_id: tournament_id, eliminated: eliminated });
      result(null, { user_id: user_id, tournament_id: tournament_id, eliminated: eliminated });
    }
  );
};

TournamentUser.remove = (user_id, tournament_id, result) => {
  sql.query("DELETE FROM TournamentUsers WHERE user_id = ? and tournament_id = ?", [user_id, tournament_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User Tournament with the user id and tournament id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Tournament User with user_id: ", user_id, " tournament_id: ", tournament_id);
    result(null, res);
  });
};

TournamentUser.removeAll = result => {
  sql.query("DELETE FROM TournamentUsers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tournament users`);
    result(null, res);
  });
};

module.exports = TournamentUser;