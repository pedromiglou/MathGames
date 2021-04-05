const sql = require("./db.js");

// constructor
const Comment = function(comment) {
  this.text = comment.text;
  this.rating = comment.rating;
  this.poster = comment.poster;
  this.receiver = comment.receiver;
};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO Comments SET text = ?, rating = ?, poster = ?, receiver = ?", [newComment.text, newComment.rating, newComment.poster, newComment.receiver], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};

Comment.findById = (comment_id, result) => {
  sql.query('SELECT * FROM Comments WHERE id = ?', comment_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Comment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Comment with the id
    result({ kind: "not_found" }, null);
  });
};

Comment.getAll = result => {
  sql.query("SELECT * FROM Comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Comments: ", res);
    result(null, res);
  });
};

Comment.updateById = (comment_id, comment, result) => {
  sql.query(
    "UPDATE Comments SET text = ?, rating = ?, poster = ?, receiver = ? WHERE id = ?",
    [comment.text, comment.rating, comment.poster, comment.receiver, comment_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Comment with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Comment: ", { id: comment_id, ...comment });
      result(null, { id: comment_id, ...comment });
    }
  );
};

Comment.remove = (comment_id, result) => {
  sql.query("DELETE FROM Comments WHERE id = ?", comment_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Comment with the user id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Comment with id: ", comment_id);
    result(null, res);
  });
};

Comment.removeAll = result => {
  sql.query("DELETE FROM Comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Comments`);
    result(null, res);
  });
};

module.exports = Comment;