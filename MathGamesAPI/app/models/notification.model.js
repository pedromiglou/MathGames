const sql = require("./db.js");

// constructor
const Notification = function(notification) {
  this.sender = notification.sender;
  this.receiver = notification.receiver;
  this.notification_type = notification.notification_type;
};

Notification.create = (notification, result) => {
  let date = new Date();
  date.setTime( date.getTime() - new Date().getTimezoneOffset()*60*1000 );
  //date.setHours(date.getHours() + 1);
  date = date.toISOString().slice(0, 19).replace('T', ' ');
  console.log(date);
  sql.query("INSERT INTO Notifications SET sender = ?, receiver = ?, notification_type = ?, notification_date = ?", [notification.sender, notification.receiver, notification.notification_type, date], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(res);
    console.log("created Notification: ", { id: res.insertId, ...notification });
    result(null, { id: res.insertId, ...notification });
  });
};

Notification.findByUserId = (user_id, result) => {
  sql.query('SELECT Notifications.id, User.id as sender_id, username as sender, receiver, notification_type, notification_date ' + 
  'FROM Notifications JOIN User ON sender = User.id WHERE receiver = ? ORDER BY notification_date desc', [user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Notifications: ", res);
      result(null, res);
      return;
    }

    // not found Notifications with the user id
    result({ kind: "not_found" }, null);
  });
};

Notification.getAll = result => {
  sql.query("SELECT * FROM Notifications", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Notifications: ", res);
    result(null, res);
  });
};

Notification.remove = (notificationId, result) => {
  sql.query("DELETE FROM Notifications WHERE id = ?", [notificationId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Notification with the notificationId
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Notification with id ", notificationId);
    result(null, res);
  });
};

Notification.removeAll = result => {
  sql.query("DELETE FROM Notifications", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Notifications`);
    result(null, res);
  });
};

module.exports = Notification;