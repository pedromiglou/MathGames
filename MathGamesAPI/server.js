//const bodyParser = require("body-parser");
//const helmet = require("helmet");

const express = require("express");
const index = require("./app/routes/index")

const app = express();
app.use(index);
const server = require("http").createServer(app)

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});


const port = process.env.PORT || 4000;

require("./app/routes/user.routes.js")(app);
require("./app/routes/game.routes.js")(app);
require("./app/routes/gamematch.routes.js")(app);
require("./app/routes/userranks.routes.js")(app);
require("./app/routes/ban.routes.js")(app);
require("./app/routes/tournament.routes.js")(app);
require("./app/routes/tournamentmatches.routes.js")(app);
require("./app/routes/tournamentusers.routes.js")(app);
require("./app/routes/friend.routes.js")(app);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 2000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});


const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  
  
  /*const config = {
    type: Phaser.WEBGL,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1100,
    height: 750,
    backgroundColor: '#4488aa',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

  new Phaser.Game(config);
  */

  socket.emit("FromAPI", response);
};


server.listen(port, () => console.log(`Listening on port ${port}`));




/*
function preload() {
  this.load.image('square', process.env.PUBLIC_URL + '/game_assets/rastros/square.png');
  this.load.image('p1', process.env.PUBLIC_URL + '/game_assets/rastros/p1.png');
  this.load.image('p2', process.env.PUBLIC_URL + '/game_assets/rastros/p2.png');
  this.load.image('piece', process.env.PUBLIC_URL + '/game_assets/rastros/piece.png');
  this.load.image('blocked', process.env.PUBLIC_URL + '/game_assets/rastros/blocked.png');
  this.load.audio('click', [process.env.PUBLIC_URL + '/game_assets/rastros/move.wav']);
}

function create() {
  this.INITIAL_BOARD_POS = 60
  this.DISTANCE_BETWEEN_SQUARES = 105
  // Sound effect played after every move
  this.move_sound = this.sound.add('click', {volume: 0.2});
  // Array that stores the board's clickable positions
  this.positions = []
  // Player which is currently playing (1 or 2)
  this.current_player = 1;
  // True if it's a player's turn, False if it's the AI's turn
  this.player_turn = true;		
  // True if the player's last click was the moving piece, false otherwise
  var clicked_piece_flag = false
  // Squares which have been blocked
  var blocked_squares = new Set()
  // Squares to where the moving piece can currently move
  var valid_squares = new Set(["10", "11", "12", "17", "19", "24", "25", "26"])
  // Positions referencing the last movement made
  var last_played = new Set()

  // Loop used to fill the board with clickable squares
  for (var pos_y = 0; pos_y < 7; pos_y++) {
      for (var pos_x = 0; pos_x < 7; pos_x++) {
          var pos = pos_y*7+pos_x;
          if (pos === 6)
              this.positions.push(this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'p2').setName(String(pos)).setInteractive());
          else if (pos === 42)
              this.positions.push(this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'p1').setName(String(pos)).setInteractive());
          else
              this.positions.push(this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*pos_x, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*pos_y, 'square').setName(String(pos)).setInteractive());
      }
  }
  
  console.log(this.positions)


  // Fill in the moving piece
  var player_piece = this.add.image(this.INITIAL_BOARD_POS + this.DISTANCE_BETWEEN_SQUARES*4, this.INITIAL_BOARD_POS+this.DISTANCE_BETWEEN_SQUARES*2, 'piece').setName('player_piece').setInteractive();

  this.add.text(750+20, 60, "É a vez do jogador:", {font: "40px Impact", color: "Orange"});
  var current_player_text = this.add.text(750+95, 120, "Jogador " + this.current_player, {font: "40px Impact", color: "Orange"});

  // Triggered when the player clicks
  this.input.on('pointerdown', function(pointer, currentlyOver) {
      var clicked_piece = currentlyOver[0];
      if ( clicked_piece !== undefined  && this.player_turn)
          if (clicked_piece.name === "player_piece") {
              if (!clicked_piece_flag) {
                  clicked_piece_flag = true;
                  valid_squares.forEach(square => this.positions[square].setTint(0x00FF00));
              } else {
                  clicked_piece_flag = false;
                  valid_squares.forEach(square => this.positions[square].clearTint());
              }
          } else if ( clicked_piece_flag ) {
              clicked_piece_flag = false;
              valid_squares.forEach(square => this.positions[square].clearTint());
              var is_finished = move(this, blocked_squares, clicked_piece, current_player_text, last_played, valid_squares, player_piece);

              if ( game_type === "AI" && !is_finished ) {
                  this.player_turn = false;
                  
                  // Process AI move
                  var ai_move = randomPlay(valid_squares);
                  clicked_piece = this.positions[ai_move];
                  var wait_time =  Math.floor(Math.random() * (2000 - 500) ) + 500;
                  setTimeout(() => {move(this, blocked_squares, clicked_piece, current_player_text, last_played, valid_squares, player_piece); this.player_turn = true;}, wait_time);
              }
          }
  }, this);
}

function update() {}
*/