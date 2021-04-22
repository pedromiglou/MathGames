const bodyParser = require("body-parser");
//const helmet = require("helmet");
const cors = require('cors')
const express = require("express");
const index = require("./app/routes/index")
const sql = require("./app/models/db.js");
const errorHandler = require("./app/config/errorhandler");
var uuid = require('uuid');
const { PassThrough } = require("stream");
const { match } = require("assert");

const app = express();
app.use(index);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler)

const server = require("http").createServer(app)

const port = process.env.PORT || 4000;

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});


var current_games = {};
var match_queue = {0: [], 1: []};
var users_info = {}
var link_current_games = {};

//Connecting new Users
io.on("connection", (socket) => { 
  console.log("New client connected");
  console.log("id: ", socket.id);
  
  //
  // FRIEND GAME BY LINK SECTION 
  // 
  
  //User sends user_id and want to play with a friend through a link
  socket.on("friendbylink", (msg) => {
    var user_id = msg["user_id"]
    var game_id = msg["game_id"]
    users_info[user_id] = socket.id;
    io.to(socket.id).emit("link_sent", {"match_id": uuid.v4()});
  })

  socket.on("entered_link", (msg) => {
    console.log("User conected through link.")
    if (msg["user_id"] !== null) {
      var user_id = msg["user_id"]
      var match_id = msg["match_id"]
      users_info[user_id] = socket.id

      if (Object.keys(current_games).includes(match_id)) {
        var other_user = Object.keys(current_games[match_id])[0];
        current_games[match_id][user_id] = other_user;
        current_games[match_id][other_user] = user_id;

        io.to(users_info[other_user]).emit("match_found", {"match_id": match_id, "starter": true});
        io.to(users_info[user_id]).emit("match_found", {"match_id": match_id, "starter": false});

      } else {
        current_games[match_id] = {};
        current_games[match_id][user_id] = "";
      }
    }
  })
  //
  // END OF FRIEND GAME BY LINK SECTION 
  // 
  
  //
  // ONLINE GAME SECTION 
  // 

  //User says that he wants to play Online and put himself in matchqueue list
  socket.on("user_id", (msg) => {
    var user_id = msg["user_id"];
    var game_id = parseInt(msg["game_id"]);
    users_info[user_id] = socket.id;
    match_queue[game_id].push(user_id)

    if ( match_queue[game_id].length >= 2 ) {
      console.log("Match found.");
      var player1 = match_queue[game_id].shift()
      var player2 = match_queue[game_id].shift()
      if (player1 !== undefined && player2 !== undefined) {
        create_game(player1, player2);
      } else {
        if (player1 !== undefined) match_queue[game_id].unshift(player1)
        if (player2 !== undefined) match_queue[game_id].unshift(player2)
      }
    }
  });

  //User send user_id and match_id when he joins game to start game
  socket.on("start_game", (user_id, match_id) => {
    if (Object.keys(current_games).includes(match_id))
      if (Object.keys(current_games[match_id]).includes(user_id))
        user_id[user_id] = socket.id;
  });

  //User sends match id, userid and new_pos when he wants to make a move in the game
  socket.on("move", (new_pos, user_id, match_id) => {
    if (Object.keys(current_games).includes(match_id))
      if (Object.keys(current_games[match_id]).includes(user_id))
        io.to( users_info[ current_games[match_id][user_id] ] ).emit("move_piece", new_pos);
  })
  
  //
  // END OF ONLINE GAME SECTION 
  // 
});

function create_game(user1, user2) {
    var match_id = Object.keys(current_games).length;
    
    current_games[match_id] = {};
    current_games[match_id][user1] = user2;
    current_games[match_id][user2] = user1;
    current_games[match_id]['started'] = false;
    
    io.to(users_info[user1]).emit("match_found", {"match_id": match_id, "starter": true});
    io.to(users_info[user2]).emit("match_found", {"match_id": match_id, "starter": false});
}

require("./app/routes/user.routes.js")(app);
require("./app/routes/game.routes.js")(app);
require("./app/routes/gamematch.routes.js")(app);
require("./app/routes/userranks.routes.js")(app);
require("./app/routes/ban.routes.js")(app);
require("./app/routes/tournament.routes.js")(app);
require("./app/routes/tournamentmatches.routes.js")(app);
require("./app/routes/tournamentusers.routes.js")(app);
require("./app/routes/friend.routes.js")(app);
require("./app/routes/notification.routes.js")(app);


server.listen(port, () => console.log(`Listening on port ${port}`));

setInterval(function () {
  sql.query("Select 1");  
  console.log("controlo query");
}, 500000);
