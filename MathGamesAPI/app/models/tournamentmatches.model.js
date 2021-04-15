const sql = require("./db.js");

// constructor
const TournamentMatch = function(tournamentmatch) {
  this.match_id = tournamentmatch.match_id;
  this.tournament_id = tournamentmatch.tournament_id;
};

TournamentMatch.create = (tournamentmatch, result) => {
  sql.query("INSERT INTO TournamentMatches SET match_id = ?, tournament_id = ?", [tournamentmatch.match_id , tournamentmatch.tournament_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created TournamentMatches: ", { match_id: tournamentmatch.match_id, tournament_id: tournamentmatch.tournament_id });
    result(null, { match_id: tournamentmatch.match_id, tournament_id: tournamentmatch.tournament_id });
  });
};

TournamentMatch.findByTournamentId = (TournamentId, result) => {
  sql.query('SELECT * FROM TournamentMatches WHERE tournament_id = ?', TournamentId , (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    if (res.length) {
      console.log("found matches: ", res);
      result(null, res);
      return;
    }

    // not found Matches for tournament id
    result({ kind: "not_found" }, null);
  });
};

TournamentMatch.getAll = result => {
  sql.query("SELECT * FROM TournamentMatches", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tournament matches: ", res);
    result(null, res);
  });
};

TournamentMatch.updateByMatchId = (match_id, tournament_id, result) => {
  sql.query(
    "UPDATE TournamentMatches SET tournament_id = ? WHERE match_id = ?",
    [tournament_id, match_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Match with the Match id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated TournamentMatches: ", { match_id: match_id, tournament_id: tournament_id });
      result(null, { match_id: match_id, tournament_id: tournament_id });
    }
  );
};

TournamentMatch.remove = (match_id, result) => {
  sql.query("DELETE FROM TournamentMatches WHERE match_id = ?", [match_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Match with the match id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted match with match_id: ", match_id);
    result(null, res);
  });
};

TournamentMatch.removeAll = result => {
  sql.query("DELETE FROM TournamentMatches", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tournament matches`);
    result(null, res);
  });
};

module.exports = TournamentMatch;