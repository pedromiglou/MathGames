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

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


var current_games = {};
var match_queue = {0: [], 1: []};
var users_info = {}

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
    users_info[user_id] = {"socket": socket.id, "username": null};
    io.to(socket.id).emit("link_sent", {"match_id": uuid.v4()});
  })

  socket.on("entered_link", (msg) => {
    console.log("User conected through link.")
    if (msg["user_id"] !== null) {
      var user_id = msg["user_id"]
      var match_id = msg["match_id"]
      var game_id = msg["game_id"]
      users_info[user_id] = {"socket": socket.id, "username": null}

      if (Object.keys(current_games).includes(match_id)) {
        var other_user = Object.keys(current_games[match_id])[1];
        current_games[match_id][user_id] = other_user;
        current_games[match_id][other_user] = user_id;

        initiate_game(match_id, other_user, user_id)

      } else {
        create_game(match_id, game_id, user_id, null)
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
    users_info[user_id] = {"socket": socket.id, "username": null};
    match_queue[game_id].push(user_id)

    if ( match_queue[game_id].length >= 2 ) {
      console.log("Match found.");
      var player1 = match_queue[game_id].shift()
      var player2 = match_queue[game_id].shift()
      if (player1 !== undefined && player2 !== undefined ) {
        if (player1 !== player2) 
          create_game(null, game_id, player1, player2);
        else 
          match_queue[game_id].unshift(player1)
      } else {
        if (player1 !== undefined) match_queue[game_id].unshift(player1)
        if (player2 !== undefined) match_queue[game_id].unshift(player2)
      }
    }
  });

  //User send username, user_id and match_id when he joins game to start game
  socket.on("start_game", (msg) => {
    var username = msg["username"];
    var user_id = msg["user_id"];
    var match_id = msg["match_id"];
    if (Object.keys(current_games).includes(match_id))
      if (Object.keys(current_games[match_id]).includes(user_id))
        users_info[user_id] = {"socket": socket.id, "username": username};
  });

  //User sends match id, userid and new_pos when he wants to make a move in the game
  socket.on("move", (new_pos, user_id, match_id) => {
    if (Object.keys(current_games).includes(match_id))
      if (Object.keys(current_games[match_id]).includes(user_id))
        if (valid_move(user_id, match_id, new_pos))
          io.to( users_info[ current_games[match_id][user_id] ]["socket"] ).emit("move_piece", new_pos);
  })

  
  //
  // END OF ONLINE GAME SECTION 
  // 
});


function create_game(match_id, game_id, user1, user2) {
    if (match_id === null)
      match_id = Object.keys(current_games).length;
    
    current_games[match_id] = {};
    current_games[match_id]["game_id"] = game_id;
    current_games[match_id][user1] = user2;
    current_games[match_id][user2] = user1;
    if (game_id === 0) {
      current_games[match_id]['state'] = {
        'blocked_pos': new Set(),
        'current_pos': 18,
        'valid_squares': new Set([10, 11, 12, 17, 19, 24, 25, 26])
      };
    }
    
    if (user1 !== null && user2 !== null)
      initiate_game(match_id, user1, user2)
}

function initiate_game(match_id, user1, user2) {
    io.to(users_info[user1]["socket"]).emit("match_found", {"match_id": match_id, "starter": true});
    io.to(users_info[user2]["socket"]).emit("match_found", {"match_id": match_id, "starter": false});
}



function valid_move(user_id, match_id, new_pos) {
  new_pos = parseInt(new_pos)

  //Verificar o jogo
  if (current_games[match_id]["game_id"] === 0) {
    //RASTROS
    var valid_squares = current_games[match_id]['state']['valid_squares']
    var blocked_pos = current_games[match_id]['state']['blocked_pos']
    blocked_pos.add(new_pos)

    if (valid_squares.has(new_pos)) {
      valid_squares.clear()
    
      // Add all possible positions
      valid_squares.add(new_pos-6);
      valid_squares.add(new_pos-7);
      valid_squares.add(new_pos-8);

      valid_squares.add(new_pos+6);
      valid_squares.add(new_pos+7);
      valid_squares.add(new_pos+8);

      valid_squares.add(new_pos-1);
      valid_squares.add(new_pos+1);
      
      // Remove invalid squares (edge cases)
      if ( [0,1,2,3,4,5,6].includes(new_pos) ) {
          valid_squares.delete(new_pos-6);
          valid_squares.delete(new_pos-7);
          valid_squares.delete(new_pos-8);
      }

      if ( [42,43,44,45,46,47,48].includes(new_pos) ) {
          valid_squares.delete(new_pos+6);
          valid_squares.delete(new_pos+7);
          valid_squares.delete(new_pos+8);
      }

      if ( [0,7,14,21,28,35,42].includes(new_pos) ) {
          valid_squares.delete(new_pos-8);
          valid_squares.delete(new_pos-1);
          valid_squares.delete(new_pos+6);
      }

      if ( [6,13,20,27,34,41,48].includes(new_pos) ) {
          valid_squares.delete(new_pos-6);
          valid_squares.delete(new_pos+1);
          valid_squares.delete(new_pos+8);
      }

      // Remove blocked squares
      blocked_pos.forEach(square => valid_squares.delete(square));

      current_games[match_id]['state']['blocked_pos'] = blocked_pos
      current_games[match_id]['state']['current_pos'] = new_pos
      current_games[match_id]['state']['valid_squares'] = valid_squares

      // Check for win conditions
      if (new_pos === 6 || new_pos === 42 || set_diff(valid_squares, blocked_pos).size === 0) {
        console.log("FINNISH GAME")
        console.log(users_info[user_id])
        console.log(users_info[user_id]["username"])
        finnish_game(match_id, user_id, new_pos);
        return false;
      } 

      return true
    }
    return false
  }
  return true
}


function finnish_game(match_id, winner, new_pos) {
  io.to( users_info[ current_games[match_id][winner] ]["socket"] ).emit("move_piece", new_pos);
  if (winner == undefined) {
    current_games.delete(match_id)
  } else {
    console.log(winner)
  }
}


function set_diff(a, b) {
  return new Set( [...a].filter(x => !b.has(x)) )
}

require("./app/routes/user.routes.js")(app);
require("./app/routes/ban.routes.js")(app);
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
