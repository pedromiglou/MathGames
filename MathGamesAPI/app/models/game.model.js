const sql = require("./db.js");

// constructor
const Game = function(game) {
  this.name = game.name;
  this.description = game.description;
  this.age = game.age;
};

Game.create = (newGame, result) => {
  sql.query("INSERT INTO Game SET ?", newGame, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Game: ", { id: res.insertId, ...newGame });
    result(null, { id: res.insertId, ...newGame });
  });
};

Game.findById = (GameId, result) => {
  sql.query(`SELECT * FROM Game WHERE id = ${sql.escape(GameId)}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found game: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Game with the id
    result({ kind: "not_found" }, null);
  });
};

Game.getAll = result => {
  sql.query("SELECT * FROM Game", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("games: ", res);
    result(null, res);
  });
};

Game.updateById = (id, game, result) => {
  sql.query(
    "UPDATE Game SET name = ?, description = ?, age = ? WHERE id = ?",
    [game.name, game.description, game.age, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Game with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated game: ", { id: id, ...game });
      result(null, { id: id, ...game });
    }
  );
};

Game.remove = (id, result) => {
  sql.query("DELETE FROM Game WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Game with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Game with id: ", id);
    result(null, res);
  });
};

Game.removeAll = result => {
  sql.query("DELETE FROM Game", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} games`);
    result(null, res);
  });
};

module.exports = Game;