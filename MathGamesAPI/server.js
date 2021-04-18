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
const in_game_users = {};
const match_queue = {};
const current_games = {};

io.on("connection", (socket) => { 
  console.log("New client connected");
  console.log("id: ", socket.id);
  socket.emit('connection');

  socket.on("user_id", (user_id) => {
    match_queue[user_id] = socket.id;
    console.log(match_queue);
    console.log(Object.keys(match_queue).length)
    if ( Object.keys(match_queue).length >= 2 ) {
      console.log("Match found.");
      create_game(Object.keys(match_queue)[0], Object.keys(match_queue)[1]);
    }
  });

  socket.on("start_game", (user_id, match_id) => {
    if (Object.keys(current_games).includes(match_id)) {
      if (Object.keys(current_games[match_id]).includes(user_id)) {
        console.log("Everythings checks out.");
        in_game_users[user_id] = socket.id;
        console.log(in_game_users)
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
    
    io.to(match_queue[user1]).emit("match_found", match_id);
    io.to(match_queue[user2]).emit("match_found", match_id);
}

/*
let interval;

var myconnections = new Set()

io.on("connection", (socket) => {
  console.log("New client connected");
  myconnections.add(socket)

  socket.on('client-server', (msg) => {
    console.log("aqui")
    console.log(msg)
    console.log(myconnections.size)
    myconnections.forEach( element => {
      console.log("vai")
      if (socket != element) {
        element.emit('server-client', msg);
      }
    } ) 
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    myconnections.delete(socket)
  });
});


const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client

  socket.emit("FromAPI", response);
};
*/

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
