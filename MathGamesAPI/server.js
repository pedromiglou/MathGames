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
const UserRank = db.user_ranks;


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
    users_info[user_id] =  socket.id;
    io.to(socket.id).emit("link_sent", {"match_id": uuid.v4()});
  })

  socket.on("entered_link", (msg) => {
    console.log("User conected through link.")
    console.log(msg)
    if (msg["user_id"] !== null) {
      var user_id = msg["user_id"]
      var match_id = msg["match_id"]
      var game_id = msg["game_id"]
      users_info[user_id] = socket.id

      if (Object.keys(current_games).includes(match_id)) {
        var other_user = Object.keys(current_games[match_id]['users'])[0];
        current_games[match_id]['users'][user_id] = [other_user];
        current_games[match_id]['users'][other_user] = [user_id];

        if (other_user !== user_id)
          initiate_game(match_id, other_user, user_id)

      } else {
        create_game(match_id, game_id, user_id, null, "amigo")
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
    console.log(msg)
    var user_id = msg["user_id"];
    var game_id = parseInt(msg["game_id"]);
    users_info[user_id] = socket.id;
    match_queue[game_id].push(user_id)

    if ( match_queue[game_id].length >= 2 ) {
      console.log("Match found.");
      var player1 = match_queue[game_id].shift()
      var player2 = match_queue[game_id].shift()
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
    console.log(msg)
    var user_id = msg["user_id"];
    var match_id = msg["match_id"];
    var account_player = msg["account_player"]
    if (Object.keys(current_games).includes(match_id))
      if (Object.keys(current_games[match_id]['users']).includes(user_id))
        current_games[match_id]['users'][user_id] = [ current_games[match_id]['users'][user_id][0], account_player]
        users_info[user_id] = socket.id
    
  });

  //User sends match id, userid and new_pos when he wants to make a move in the game
  socket.on("move", (new_pos, user_id, match_id) => {
    if (Object.keys(current_games).includes(match_id))
      if (Object.keys(current_games[match_id]['users']).includes(user_id))
        if (valid_move(user_id, match_id, new_pos)) {
          io.to( users_info[ current_games[match_id]['users'][user_id][0] ] ).emit("move_piece", new_pos);
          if (current_games[match_id]['state']['isFinnished'])
            finnish_game(match_id, "valid_move")
        } else {
          //Move is not valid. Match will end and oponnent will win.
          current_games[match_id]['state']['isFinnished'] = true
          current_games[match_id]['state']['winner'] = (user_id === current_games[match_id]['state']['player1']) ? "2" : "1"

          //Tell this user that his movement was invalid and he lost the match
          //io.to( users_info[ user_id ] ).emit("match_endby_invalid_move", {"match_result": "lost"});

          //Tell oponnent that he have won the match by "default"
          //io.to( users_info[ current_games[match_id]['users'][user_id][0] ] ).emit("match_endby_invalid_move", {"match_result": "win"});

          finnish_game(match_id, "invalid_move")
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
  current_games[match_id]["game_id"] = game_id;
  current_games[match_id]["game_type"] = game_type;
  current_games[match_id]['users'] = {}
  current_games[match_id]['users'][user1] = [user2];
  current_games[match_id]['users'][user2] = [user1];
  current_games[match_id]['state'] = {
    'player1': user1,
    'player2': user2,
    'winner': "",
    'isFinnished': false
  }
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
  
  if (user1 !== null && user2 !== null)
    initiate_game(match_id, user1, user2)
}

function initiate_game(match_id, user1, user2) {
  User.findByPk(user1).then(value => {
    if (value !== null) {
      io.to(users_info[user2]).emit("match_found", {"match_id": match_id, "starter": false, "opponent": value.username});
    }
    else {
      io.to(users_info[user2]).emit("match_found", {"match_id": match_id, "starter": false, "opponent": "Guest_" + user1});
    }
  }).catch(error => {});

  User.findByPk(user2).then(value => {
    if (value !== null)
      io.to(users_info[user1]).emit("match_found", {"match_id": match_id, "starter": true, "opponent": value.username});
    else
      io.to(users_info[user1]).emit("match_found", {"match_id": match_id, "starter": true, "opponent": "Guest_" + user2});
  }).catch(error => {});

  // io.to(users_info[user1]).emit("match_found", {"match_id": match_id, "starter": true});
  // io.to(users_info[user2]).emit("match_found", {"match_id": match_id, "starter": false});
}



function valid_move(user_id, match_id, new_pos) {

  //Verificar o jogo
  if (current_games[match_id]["game_id"] === 0) {
    new_pos = parseInt(new_pos)

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

      // Update game state
      current_games[match_id]['state']['blocked_pos'] = blocked_pos
      current_games[match_id]['state']['current_pos'] = new_pos
      current_games[match_id]['state']['valid_squares'] = valid_squares

      // Check for win conditions
      if (new_pos === 6 || new_pos === 42 || set_diff(valid_squares, blocked_pos).size === 0) {
        current_games[match_id]['state']['isFinnished'] = true
        if (new_pos === 6)
          current_games[match_id]['state']['winner'] = "2"
        else if (new_pos === 42)
          current_games[match_id]['state']['winner'] = "1"
        else
          current_games[match_id]['state']['winner'] = (user_id === current_games[match_id]['state']['player1']) ? "1" : "2"
      } 

      return true
    }
    return false
  } else if (current_games[match_id]["game_id"] === 1) {

    if ( (current_games[match_id]['state']['player_0_valid_squares'].has(new_pos) && current_games[match_id]['state']['current_player'] === user_id) 
        || (current_games[match_id]['state']['player_1_valid_squares'].has(new_pos) && current_games[match_id]['state']['current_player'] === user_id) ) {

        console.log("valido")
        if (current_games[match_id]['state']['player_0_first_move'] && current_games[match_id]['state']['player1'] === user_id)
          current_games[match_id]['state']['player_0_first_move'] = false
        if (current_games[match_id]['state']['player_1_first_move'] && current_games[match_id]['state']['player2'] === user_id)
          current_games[match_id]['state']['player_1_first_move'] = false
        
        // Get new square's position [0..49]
        var adjacents = new Set()
        var current_pos = parseInt(new_pos)

        current_games[match_id]['state']['player_0_valid_squares'].delete(String(current_pos))
        current_games[match_id]['state']['player_1_valid_squares'].delete(String(current_pos))
        adjacents.add(String(current_pos-1))
        adjacents.add(String(current_pos+1))
        adjacents.add(String(current_pos-8))
        adjacents.add(String(current_pos+8))

        // Remove invalid squares (edge cases)
        if ( [0,1,2,3,4,5,6,7].includes(current_pos) ) {
            adjacents.delete(String(current_pos-8));
        }

        if ( [56,57,58,59,60,61,62,63].includes(current_pos) ) {
            adjacents.delete(String(current_pos+8));
        }

        if ( [0,8,16,24,32,40,48,56].includes(current_pos) ) {
            adjacents.delete(String(current_pos-1));
        }

        if ( [7,15,23,31,39,47,55].includes(current_pos) ) {
            adjacents.delete(String(current_pos+1));
        }
        
        // Add player piece to new square
        if (current_games[match_id]['state']['player1'] === user_id) {
            current_games[match_id]['state']['player_1_valid_squares'] = set_diff(current_games[match_id]['state']['player_1_valid_squares'], adjacents)
            if (current_games[match_id]['state']['player_1_valid_squares'].size === 0) {
              current_games[match_id]['state']['isFinnished'] = true
              current_games[match_id]['state']['winner'] = "1"
            }
        } else {
            current_games[match_id]['state']['player_0_valid_squares'] = set_diff(current_games[match_id]['state']['player_0_valid_squares'], adjacents)
            if (current_games[match_id]['state']['player_0_valid_squares'].size === 0) {
              current_games[match_id]['state']['isFinnished'] = true
              current_games[match_id]['state']['winner'] = "2"

            }
        }

         
        if (current_games[match_id]['state']['current_player'] === current_games[match_id]['state']['player1'])
          current_games[match_id]['state']['current_player'] = current_games[match_id]['state']['player2']
        else
          current_games[match_id]['state']['current_player'] = current_games[match_id]['state']['player1']
        
        return true
      }
      return false
  }
  return true
}


//endMode: ["invalid_move", "valid_move"]
async function finnish_game(match_id, endMode) {
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

  if (player_1_account_player === true || player_2_account_player === true) {
    if (!player_1_account_player) {
      gameMatch["player1"] = null
    }
    if (!player_2_account_player) {
      gameMatch["player2"] = null
    }

    // Save GameMatch in the database
    var res = await GameMatch.create(gameMatch)

    if (game_type === "online") {
      var jogo = null;
      if (game_id === 0)
        jogo = "rastros"
      else if (game_id === 1)
        jogo = "gatos_e_caes"
      

      if (winner === "1") {
        if (player_1_account_player)
          await UserRank.increment(jogo, { by: 25, where: {user_id: player1}})
        if (player_2_account_player)
          await UserRank.decrement(jogo, { by: 25, where: {user_id: player2}})
      } else if (winner === "2") {
        if (player_2_account_player)
          await UserRank.increment(jogo, { by: 25, where: {user_id: player2}})
        if (player_1_account_player)
          await UserRank.decrement(jogo, { by: 25, where: {user_id: player1}})
      }
    }
    
    var player1_final_result;
    var player2_final_result;
    if (winner === "1") {
      player1_final_result = "win"
      player2_final_result = "lost"
    } else if (winner === "2") {
      player1_final_result = "lost"
      player2_final_result = "win"
    } else {
      player1_final_result = "draw"
      player2_final_result = "draw"
    }
  
    if (player_1_account_player)
      io.to(users_info[player1]).emit("match_end", {"match_id": match_id, "match_result": player1_final_result, "endMode": endMode});
    if (player_2_account_player)
      io.to(users_info[player2]).emit("match_end", {"match_id": match_id, "match_result": player2_final_result, "endMode": endMode});
  }

  delete current_games[match_id]

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
require("./app/routes/report.routes.js")(app);


server.listen(port, () => console.log(`Listening on port ${port}`));

setInterval(function () {
  sql.query("Select 1");  
  console.log("controlo query");
}, 500000);
