const bodyParser = require("body-parser");
//const helmet = require("helmet");
const cors = require('cors')
const express = require("express");
const index = require("./app/routes/index")

const app = express();
app.use(index);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = require("http").createServer(app)

const port = process.env.PORT || 4000;

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});


var in_game_users = {};
var current_games = {};

var match_queue = [];
var users_info = {}

io.on("connection", (socket) => { 
  console.log("New client connected");
  console.log("id: ", socket.id);
  
  //socket.emit('connection');

  socket.on("user_id", (user_id) => {
    users_info[user_id] = socket.id;
    match_queue.push(user_id)

    while ( match_queue.length >= 2 ) {
      console.log("Match found.");
      var player1 = match_queue.shift()
      var player2 = match_queue.shift()
      if (player1 !== undefined && player2 !== undefined) {
        create_game(player1, player2);
        break;
      } else {
        if (player1 !== undefined) match_queue.unshift(player1)
        if (player2 !== undefined) match_queue.unshift(player2)
      }
    }
  });

  socket.on("start_game", (user_id, match_id) => {
    if (Object.keys(current_games).includes(match_id)) {
      if (Object.keys(current_games[match_id]).includes(user_id)) {
        console.log("Everythings checks out.");
        in_game_users[user_id] = socket.id;
        console.log(in_game_users)
        console.log(match_queue)
      }
    }
  });

  socket.on("move", (new_pos, user_id, match_id) => {
    console.log("Received move: ", new_pos);
    console.log("Received match_id: ", match_id);
    
    if (Object.keys(current_games).includes(match_id)) {
      if (Object.keys(current_games[match_id]).includes(user_id)) {
        console.log("Everythings checks out.");
        console.log(current_games[match_id][user_id]);
        console.log("Sending move to: ", in_game_users[ current_games[match_id][user_id] ]);
        io.to( in_game_users[ current_games[match_id][user_id] ] ).emit("move_piece", new_pos);
      }
    }
  })
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


server.listen(port, () => console.log(`Listening on port ${port}`));
