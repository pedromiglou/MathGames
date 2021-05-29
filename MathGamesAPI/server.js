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
const { Console } = require("console");
const GameMatch = db.game_match;
const User = db.user;


db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


var current_games = {};
var match_queue = {0: [], 1: []};
var users_info = {}
var active_friend_invites = {}

//Connecting new Users
io.on("connection", (socket) => { 
  console.log("New client connected");
  console.log("id: ", socket.id);

  //
  // FRIEND GAME BY LINK SECTION
  // 

  //User sends user_id and wants to play with a friend through a link
  socket.on("generate_invite", (msg) => {
    let user_id = msg["user_id"]

    // If the user still has an active link, return null match_id
    if ( Object.values(active_friend_invites).includes(user_id) ) {
      io.to(socket.id).emit("invite_link", {"match_id": null});
      return;
    }

    users_info[user_id] = socket.id;

    let new_match_id = uuid.v4();
    active_friend_invites[new_match_id] = user_id;

    io.to(socket.id).emit("invite_link", {"match_id": new_match_id});
    // After 2 minutes, the links expires
    setTimeout(() => { delete active_friend_invites[new_match_id]; }, 120000);
    console.log(active_friend_invites)
  })

  socket.on("entered_link", (msg) => {
    console.log("User conected through link.")
    
    var match_id = msg["match_id"]
    var user_id = msg["user_id"]
    var game_id = parseInt(msg["game_id"])
    users_info[user_id] = socket.id

    if ( Object.keys(active_friend_invites).includes(match_id) ) {
      console.log("Vou criar e enviar!")
      create_game(match_id, game_id, user_id, active_friend_invites[match_id], "amigo")
      io.to( users_info[active_friend_invites[match_id]] ).emit("friend_joined", {"match_id": match_id, "player1": user_id, "player2": active_friend_invites[match_id]})
    }
    
    // if ( msg["user_id"] !== null ) {
    //   var user_id = msg["user_id"]
    //   var match_id = msg["match_id"]
    //   var game_id = msg["game_id"]
    //   users_info[user_id] = socket.id

    //   if (Object.keys(current_games).includes(match_id)) {
    //     var other_user = Object.keys(current_games[match_id]['users'])[0];
    //     current_games[match_id]['users'][user_id] = [other_user];
    //     current_games[match_id]['users'][other_user] = [user_id];

    //     if (other_user !== user_id)
    //       initiate_game(match_id, other_user, user_id)

    //   } else {
    //     create_game(match_id, game_id, user_id, null, "amigo")
    //   }
    // }
  })
  //
  // END OF FRIEND GAME BY LINK SECTION 
  // 
  
  //
  // ONLINE GAME SECTION 
  // 

  //User says that he wants to play Online and put himself in matchqueue list
  socket.on("user_id", (msg) => {
    console.log(msg)
    var user_id = msg["user_id"];
    var game_id = parseInt(msg["game_id"]);
    users_info[user_id] = socket.id;
    match_queue[game_id].push(user_id)

    if ( match_queue[game_id].length >= 2 ) {
      console.log("Match found.");
      var player1 = String( match_queue[game_id].shift() );
      var player2 = String( match_queue[game_id].shift() );
      if (player1 !== undefined && player2 !== undefined ) {
        if (player1 !== player2) 
          create_game(null, game_id, player1, player2, "online");
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
    console.log("start_game")
    var user_id = msg["user_id"];
    var match_id = msg["match_id"];
    var account_player = msg["account_player"]
    if (Object.keys(current_games).includes(match_id))
      if (Object.keys(current_games[match_id]['users']).includes(user_id)) {
        current_games[match_id]['users'][user_id] = [ current_games[match_id]['users'][user_id][0], account_player]
        users_info[user_id] = socket.id
      }
    
  });

  //User sends match id, userid and new_pos when he wants to make a move in the game
  socket.on("move", (new_pos, user_id, match_id) => {
    user_id = String(user_id);
    match_id = String(match_id);

    console.log(match_id)
    console.log(current_games)
    console.log(current_games[match_id])

    console.log("New pos: ", new_pos)
    console.log("Valid squares: ", current_games[match_id]['state']['valid_squares'])
    console.log("Is valid:", valid_move(user_id, match_id, new_pos) )
    



    if ( Object.keys(current_games).includes(match_id) )
      if ( Object.keys(current_games[match_id]['users'] ).includes(user_id))
        if ( valid_move(user_id, match_id, new_pos) ) {
          let opponent = current_games[match_id]['users'][user_id][0]
          io.to( users_info[opponent] ).emit("move_piece", new_pos);

          // Pause user's timer and restart opponent's
          current_games[match_id]['timers'][user_id].pause();
          current_games[match_id]['timers'][opponent].start();

          if ( current_games[match_id]['state']['isFinished'] ) {
            current_games[match_id]['timers'][user_id].pause();
            current_games[match_id]['timers'][opponent].pause();

            finish_game(match_id, "valid_move")
          
          }
        
        } else {
          //Move is not valid. Match will end and oponnent will win.
          let opponent = current_games[match_id]['users'][user_id][0]
          
          current_games[match_id]['state']['isFinished'] = true
          current_games[match_id]['state']['winner'] = (user_id === current_games[match_id]['state']['player1']) ? "2" : "1"
          current_games[match_id]['timers'][user_id].pause();
          current_games[match_id]['timers'][opponent].pause();
          
          finish_game(match_id, "invalid_move")
        }
  })

  
  //
  // END OF ONLINE GAME SECTION 
  // 
});


function create_game(match_id, game_id, user1, user2, game_type) {

  if (match_id === null)
    match_id = Object.keys(current_games).length;

  current_games[match_id] = {};
  current_games[match_id]['game_id'] = game_id;
  current_games[match_id]['game_type'] = game_type;
  current_games[match_id]['users'] = {}
  current_games[match_id]['users'][user1] = [user2];
  current_games[match_id]['users'][user2] = [user1];
  current_games[match_id]['state'] = {
    'player1': user1,
    'player2': user2,
    'winner': "",
    'isFinished': false
  }

  current_games[match_id]['timers'] = {}
  current_games[match_id]['timers'][user1] = new Timer(function() {
                                              console.log(current_games)
                                              current_games[match_id]['state']['isFinished'] = true;
                                              current_games[match_id]['state']['winner'] = "2";
                                              finish_game(match_id, "timeout");
                                            }, 10000);
  current_games[match_id]['timers'][user2] = new Timer(function() {
                                              console.log("It's done")
                                              current_games[match_id]['state']['isFinished'] = true;
                                              current_games[match_id]['state']['winner'] = "1";
                                              finish_game(match_id, "timeout");
                                            }, 10000);

  current_games[match_id]['timers'][user1].start();

  if (game_id === 0) {
    current_games[match_id]['state']['blocked_pos'] = new Set()
    current_games[match_id]['state']['current_pos'] = 18
    current_games[match_id]['state']['valid_squares'] = new Set([10, 11, 12, 17, 19, 24, 25, 26])
  } else if (game_id === 1) {
    current_games[match_id]['state']['current_player'] = user1
    current_games[match_id]['state']['player_0_valid_squares'] = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63"])
    current_games[match_id]['state']['player_1_valid_squares'] = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63"])
    current_games[match_id]['state']['player_0_first_move'] = true
    current_games[match_id]['state']['player_1_first_move'] = true
  }
  
  initiate_game(match_id)
  
}

function initiate_game(match_id) {
  console.log("Initiating.")
  console.log(current_games);
  let user1 = current_games[match_id]['state']['player1'];
  let user2 = current_games[match_id]['state']['player2'];

  let username1;
  let username2;

  let promises = [];
  promises.push(User.findByPk(user1));
  promises.push(User.findByPk(user2));

  Promise.all(promises).then(([u1, u2]) => {
    if (u1 === null )
      username1 = user1;
    else
      username1 = u1.username
    if (u2 === null)
      username2 = user2
    else
      username2 = u2.username

    io.to(users_info[user1]).emit("match_found", {"match_id": match_id, "player1": username1, "player2": username2});
    io.to(users_info[user2]).emit("match_found", {"match_id": match_id, "player1": username1, "player2": username2});
  });
}

function valid_move(user_id, match_id, new_pos) {

  //Verificar o jogo
  if (current_games[match_id]["game_id"] === 0)
    return validate_rastros_move(user_id, match_id, new_pos)

  if (current_games[match_id]["game_id"] === 1)
    return validate_gatoscaes_move(user_id, match_id, new_pos)
    
}

function validate_rastros_move(user_id, match_id, new_pos) {
  var current_pos = parseInt(new_pos)

  var valid_squares = current_games[match_id]['state']['valid_squares']
  var blocked_pos = current_games[match_id]['state']['blocked_pos']

  blocked_pos.add(current_pos)

  if ( valid_squares.has(current_pos) ) {
    valid_squares.clear()

    console.log(valid_squares)

    valid_squares.add(current_pos-6);
    valid_squares.add(current_pos-7);
    valid_squares.add(current_pos-8);

    valid_squares.add(current_pos+6);
    valid_squares.add(current_pos+7);
    valid_squares.add(current_pos+8);

    valid_squares.add(current_pos-1);
    valid_squares.add(current_pos+1);
  
    // Add all possible positions
    // [current_pos-6, current_pos-7, current_pos-8, current_pos+6, current_pos+7, current_pos+8, current_pos-1, current_pos+1].forEach(valid_squares.add, valid_squares);
    
    // Remove invalid squares (edge cases)
    if ( [0,1,2,3,4,5,6].includes(current_pos) )
      [current_pos-6, current_pos-7, current_pos-8].forEach(valid_squares.delete, valid_squares);

    if ( [42,43,44,45,46,47,48].includes(current_pos) )
      [current_pos+6, current_pos+7, current_pos+8].forEach(valid_squares.delete, valid_squares);

    if ( [0,7,14,21,28,35,42].includes(current_pos) )
      [current_pos-8, current_pos-1, current_pos+6].forEach(valid_squares.delete, valid_squares);

    if ( [6,13,20,27,34,41,48].includes(current_pos) )
      [current_pos-6, current_pos+1, current_pos+8].forEach(valid_squares.delete, valid_squares);

    // Remove blocked squares
    blocked_pos.forEach(square => valid_squares.delete(square));

    // Update game state
    current_games[match_id]['state']['blocked_pos'] = blocked_pos
    current_games[match_id]['state']['current_pos'] = current_pos
    current_games[match_id]['state']['valid_squares'] = valid_squares

    // Check for win conditions
    if (current_pos === 6 || current_pos === 42 || set_diff(valid_squares, blocked_pos).size === 0) {
      current_games[match_id]['state']['isFinished'] = true;
      current_games[match_id]['state']['extra'] = "reached_goal";
      if (current_pos === 6)
        current_games[match_id]['state']['winner'] = "2";
      else if (current_pos === 42)
        current_games[match_id]['state']['winner'] = "1";
      else {
        current_games[match_id]['state']['extra'] = "no_moves";
        current_games[match_id]['state']['winner'] = (user_id === current_games[match_id]['state']['player1']) ? "1" : "2";
      }
    } 

    return true
  }
  return false
}

function validate_gatoscaes_move(user_id, match_id, new_pos) {
  console.log("Passei aqui1")
  console.log(current_games[match_id]['state']['player_0_valid_squares'].has(new_pos))
  console.log(user_id)
  console.log(current_games[match_id]['state']['current_player'] === user_id)
  if ( !( (current_games[match_id]['state']['player_0_valid_squares'].has(new_pos) && current_games[match_id]['state']['current_player'] === user_id) 
      || (current_games[match_id]['state']['player_1_valid_squares'].has(new_pos) && current_games[match_id]['state']['current_player'] === user_id) ) )
      return false
  console.log("Passei aqui")

  if (current_games[match_id]['state']['player_0_first_move'] && current_games[match_id]['state']['player1'] === user_id)
    current_games[match_id]['state']['player_0_first_move'] = false
  if (current_games[match_id]['state']['player_1_first_move'] && current_games[match_id]['state']['player2'] === user_id)
    current_games[match_id]['state']['player_1_first_move'] = false
  
  // Get new square's position [0..49]
  var adjacents = new Set()
  var current_pos = new_pos;

  current_games[match_id]['state']['player_0_valid_squares'].delete(String(current_pos))
  current_games[match_id]['state']['player_1_valid_squares'].delete(String(current_pos))
  adjacents.add(String(current_pos-1))
  adjacents.add(String(current_pos+1))
  adjacents.add(String(current_pos-8))
  adjacents.add(String(current_pos+8))

  // Remove invalid squares (edge cases)
  if ( [0,1,2,3,4,5,6,7].includes(current_pos) )
    adjacents.delete(String(current_pos-8));

  if ( [56,57,58,59,60,61,62,63].includes(current_pos) )
    adjacents.delete(String(current_pos+8));

  if ( [0,8,16,24,32,40,48,56].includes(current_pos) )
    adjacents.delete(String(current_pos-1));

  if ( [7,15,23,31,39,47,55].includes(current_pos) )
    adjacents.delete(String(current_pos+1));
    
  // Add player piece to new square
  if (current_games[match_id]['state']['player1'] === user_id) {
    current_games[match_id]['state']['player_1_valid_squares'] = set_diff(current_games[match_id]['state']['player_1_valid_squares'], adjacents)
    if (current_games[match_id]['state']['player_1_valid_squares'].size === 0) {
      current_games[match_id]['state']['isFinished'] = true
      current_games[match_id]['state']['winner'] = "1"
      current_games[match_id]['state']['extra'] = "no_moves";
    }
  } else {
    current_games[match_id]['state']['player_0_valid_squares'] = set_diff(current_games[match_id]['state']['player_0_valid_squares'], adjacents)
    if (current_games[match_id]['state']['player_0_valid_squares'].size === 0) {
      current_games[match_id]['state']['isFinished'] = true
      current_games[match_id]['state']['winner'] = "2"
      current_games[match_id]['state']['extra'] = "no_moves";

    }
  }

  if (current_games[match_id]['state']['current_player'] === current_games[match_id]['state']['player1'])
    current_games[match_id]['state']['current_player'] = current_games[match_id]['state']['player2']
  else
    current_games[match_id]['state']['current_player'] = current_games[match_id]['state']['player1']
    
  return true

}


//endMode: ["invalid_move", "valid_move"]
async function finish_game(match_id, endMode) {
  var winner = current_games[match_id]['state']['winner'] 
  var player1 = current_games[match_id]['state']['player1']
  var player_1_account_player = current_games[match_id]['users'][player1][1]
  var player2 = current_games[match_id]['state']['player2'] 
  var player_2_account_player = current_games[match_id]['users'][player2][1]
  var game_id = current_games[match_id]['game_id']
  var game_type = current_games[match_id]['game_type']

  // Create a GameMatch 
  var gameMatch = {
    player1: parseInt(player1),
    player2: parseInt(player2),
    winner: winner,
    game_type: game_type,
    game_id: game_id
  };

  var player1_final_result;
  var player2_final_result;
  if (winner === "1") {
    player1_final_result = "win"
    player2_final_result = "loss"
  } else if (winner === "2") {
    player1_final_result = "loss"
    player2_final_result = "win"
  } else {
    player1_final_result = "draw"
    player2_final_result = "draw"
  }

  if (player_1_account_player === true || player_2_account_player === true) {
    if (!player_1_account_player) {
      gameMatch["player1"] = null
    }
    if (!player_2_account_player) {
      gameMatch["player2"] = null
    }

    // Save GameMatch in the database
    var res = await GameMatch.create(gameMatch)  
  }

  io.to(users_info[player1]).emit("match_end", {"match_id": match_id, "match_result": player1_final_result, "end_mode": endMode, "extra": current_games[match_id]['state']['extra']});
  io.to(users_info[player2]).emit("match_end", {"match_id": match_id, "match_result": player2_final_result, "end_mode": endMode, "extra": current_games[match_id]['state']['extra']});

  delete current_games[match_id];
  delete active_friend_invites[match_id];

}

var Timer = function(callback, delay) {
  var timerId, start, remaining = delay;

  this.start = function() {
    start = Date.now();
    clearTimeout(timerId);
    timerId = setTimeout(callback, remaining);
  };

  this.pause = function() {
      clearTimeout(timerId);
      remaining -= Date.now() - start;
  };

  this.getRem = function() {
    return remaining;
  }

};

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
