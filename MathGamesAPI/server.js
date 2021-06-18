const bodyParser = require("body-parser");
const cors = require('cors')
const express = require("express");
const index = require("./app/routes/index")
const sql = require("./app/models/db.js");
const errorHandler = require("./app/config/errorhandler");
var uuid = require('uuid');


const app = express();
app.use(index);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler)

const server = require("http").createServer(app)

const port = process.env.PORT || 4000;


/////
// Start Swagger Configuration Section
/////

const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "MathGames API",
      description: "MathGames Server REST API",
      contact: {
        name: "MathGames"
      },
      servers: ["http://localhost:4000"]
    }
  },
  apis: ["app/routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

/////
// End Swagger Configuration Section
/////


const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});

const db = require("./app/models");
const { match } = require("assert");
const GameMatch = db.game_match;
const Game = db.game;
const User = db.user;
const UserRank = db.user_ranks;
const AvatarItems = db.avatar_items;
const Tournament = db.tournament;
const TournamentMatch = db.tournament_matches;
const TournamentUser = db.tournament_users
const Notification = db.notifications


async function synchronize() {
  await db.sequelize.sync();
  await Game.findOrCreate({where: {
      id: 0
    }, defaults: {
      name: "Rastros",
      description: "Descricao do Rastros",
      age: 6
    }
  });

  var game0 = await Game.findByPk(0);
  if (game0 === null) {
    await Game.update({id: 0},{ where: {id: 1}}).then(console.log("Game id atualizado")).catch(err => {console.log("Error updating Game 1"); console.log(err)});
  }

  await Game.findOrCreate({where: {
      id: 1
    }, defaults: {
      name: "Gatos e Caes",
      description: "Descricao do Gatos e Caes",
      age: 6
    }
  });
  
  var game1 = await Game.findByPk(1);
  if (game1 === null) {
    await Game.update({id: 1},{ where: {id: 2}}).then(game => {console.log("Game id atualizado"); console.log(game)}).catch(err => {console.log("Error updating Game 2"); console.log(err)});;
  }
  
  await User.findOrCreate({where: {
      id: 1
    }, defaults: {
      username: "admin",
      password: "admin123",
      email: "admin@gmail.com",
      account_type: "A"
    }
  });
  await UserRank.findOrCreate({where: {user_id: 1}})


  await AvatarItems.findOrCreate({where: {
      name: "Trouser1"
    }, defaults: {
      level: 0,
      category: "Trouser"
    }
  });
  await AvatarItems.findOrCreate({where: {
      name: "Trouser2"
    }, defaults: {
      level: 0,
      category: "Trouser"
    }
  });
  await AvatarItems.findOrCreate({where: {
      name: "Trouser3"
    }, defaults: {
      level: 20,
      category: "Trouser"
    }
  });
  await AvatarItems.findOrCreate({where: {
      name: "TrouserJeans"
    }, defaults: {
      level: 30,
      category: "Trouser"
    }
  });
  await AvatarItems.findOrCreate({where: {
      name: "TrouserBlackJeans"
    }, defaults: {
      level: 40,
      category: "Trouser"
    }
  });
  await AvatarItems.findOrCreate({where: {
      name: "TrouserGrey"
    }, defaults: {
      level: 50,
      category: "Trouser"
    }
  });

  await AvatarItems.findOrCreate({where: {
    name: "Camouflage1"
  }, defaults: {
    level: 0,
    category: "Shirt"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "Camouflage2"
  }, defaults: {
    level: 50,
    category: "Shirt"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "Carpet1"
  }, defaults: {
    level: 50,
    category: "Shirt"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "GreyFabric"
  }, defaults: {
    level: 5,
    category: "Shirt"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "BlueFabric"
  }, defaults: {
    level: 15,
    category: "Shirt"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "ShirtWool1"
  }, defaults: {
    level: 45,
    category: "Shirt"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "ShirtWool2"
  }, defaults: {
    level: 65,
    category: "Shirt"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "ShirtWool3"
  }, defaults: {
    level: 70,
    category: "Shirt"
  }
  });

  await AvatarItems.findOrCreate({where: {
    name: "MagicianHat"
  }, defaults: {
    level: 0,
    category: "Hat"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "CowboyHat"
  }, defaults: {
    level: 0,
    category: "Hat"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "WitchHat"
  }, defaults: {
    level: 5,
    category: "Hat"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "ChristmasHat"
  }, defaults: {
    level: 25,
    category: "Hat"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "Ushanka"
  }, defaults: {
    level: 60,
    category: "Hat"
  }
  });


  await AvatarItems.findOrCreate({where: {
    name: "AviatorGlasses"
  }, defaults: {
    level: 0,
    category: "Accessorie"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "SunGlasses"
  }, defaults: {
    level: 10,
    category: "Accessorie"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "SteamPunkGlasses"
  }, defaults: {
    level: 35,
    category: "Accessorie"
  }
  });
  await AvatarItems.findOrCreate({where: {
    name: "PixelGlasses"
  }, defaults: {
    level: 55,
    category: "Accessorie"
  }
  });

}
synchronize()

var current_games = {};
var players_in_game = {};
var match_queue = {0: [], 1: []};
var users_info = {}
var active_friend_link = {}
var active_friend_invites = {}

var active_tournaments = {}

/* EXEMPLO DA ESTRUTURA DO ACTIVE_TOURNAMENTS

{
  idTorneio1: {
    torneio_info = torneio,
    players: {
      idJogador1: idRoom,
      idJogador2: idRoom
    },
    rooms: {
      idRoom: {players_in: [idJogadores checkados],
               started: boolean
              }
    }
  },
  idTorneio2: {}
}

*/

//Connecting new Users
io.on("connection", (socket) => { 
    console.log("New client connected");
    console.log("id: ", socket.id);

    socket.on("disconnect", function() {
        var user_id = String( Object.keys(users_info).find(key => users_info[key] === socket.id) );
        console.log("Leaving user id: ", user_id)
        if (user_id === null)
            return;

        delete users_info[user_id];
        
        let user_idx_0 = match_queue[0].indexOf(user_id);
        let user_idx_1 = match_queue[1].indexOf(user_id);

        if ( user_idx_0 > -1 )
            match_queue[0].splice( user_idx_0, 1 )
        if ( user_idx_1 > -1 )
            match_queue[1].splice( user_idx_1, 1 )
          

        var in_game_user_match_id = players_in_game[user_id]

        if ( in_game_user_match_id !== undefined ) {
          let game = current_games[in_game_user_match_id];
          game['state']['isFinished'] = true;
          game['state']['winner'] = (user_id === current_games[in_game_user_match_id]['state']['player1']) ? "2" : "1";
          finish_game(in_game_user_match_id, "forfeit")
        }

    })


    socket.on("send_notification", (msg) =>  {

    })

  //
  // FRIEND GAME BY INVITE SECTION
  // 

  socket.on("generate_invite", (msg) => {
    let user_id = String(msg["user_id"])
    let outro_id = String(msg["outro_id"])
    let game_id = parseInt(msg["game_id"])

    // If the user still has an active link, return null match_id
    if ( Object.keys(active_friend_invites).includes(user_id) ) {
      io.to(socket.id).emit("invite_link", {"match_id": null});
      return;
    }

    users_info[user_id] = socket.id;

    let new_match_id = uuid.v4();
    active_friend_invites[user_id] = {"outro_id": outro_id, "match_id": new_match_id, "game_id": game_id};

    io.to(socket.id).emit("invite_link", {"match_id": new_match_id});
    // After 2 minutes, the invites expires
    setTimeout(() => { delete active_friend_invites[user_id]; }, 120000);
  })

  // user that accepts friend invite needs match_id. 
  socket.on("get_match_id", (msg) => {
    if (msg["user_id"] !== null) {
      var user_id = String(msg["user_id"])
      var outro_id = String(msg["outro_id"])

      users_info[user_id] = socket.id

      if ( Object.keys(active_friend_invites).includes(outro_id) && active_friend_invites[outro_id]["outro_id"] === user_id) {
        io.to( users_info[user_id] ).emit("match_link", {"match_id": active_friend_invites[outro_id]["match_id"], "game_id": active_friend_invites[outro_id]["game_id"]})
      } else {
        io.to( users_info[user_id] ).emit("match_link", {"error": "invite expired"})
      }
    }
  })

  socket.on("entered_invite", (msg) => {
    console.log("User conected through link.")
    if (msg["user_id"] !== null) {
      var match_id = msg["match_id"]
      var user_id = String(msg["user_id"])
      var outro_id = String(msg["outro_id"])
      var game_id = parseInt(msg["game_id"])
      users_info[user_id] = socket.id

      if ( Object.keys(active_friend_invites).includes(outro_id) && active_friend_invites[outro_id]["outro_id"] === user_id)
        create_game(match_id, game_id, user_id, outro_id, "amigo", null)
    }
  })


  //
  // FRIEND GAME BY LINK SECTION
  //

  //User sends user_id and wants to play with a friend through a link
  socket.on("generate_link", (msg) => {
    let user_id = msg["user_id"]

    // If the user still has an active link, return null match_id
    if ( Object.values(active_friend_link).includes(user_id) ) {
      io.to(socket.id).emit("invite_link", {"match_id": null});
      return;
    }

    users_info[user_id] = socket.id;

    let new_match_id = uuid.v4();
    active_friend_link[new_match_id] = user_id;

    io.to(socket.id).emit("invite_link", {"match_id": new_match_id});
    // After 2 minutes, the links expires
    setTimeout(() => { delete active_friend_link[new_match_id]; }, 120000);
    console.log("Active friend link:", active_friend_link)
  })

  socket.on("entered_link", (msg) => {
    console.log("User conected through link.")

    if (msg["user_id"] !== null) {
      var match_id = msg["match_id"]
      var user_id = msg["user_id"]
      var game_id = parseInt(msg["game_id"])
      users_info[user_id] = socket.id

      if ( Object.keys(active_friend_link).includes(match_id) ) {
        console.log("Vou criar e enviar!")
        create_game(match_id, game_id, user_id, active_friend_link[match_id], "amigo", null)
        io.to( users_info[active_friend_link[match_id]] ).emit("friend_joined", {"match_id": match_id, "player1": user_id, "player2": active_friend_link[match_id]})
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
  socket.on("enter_matchmaking", (msg) => {
      
    var user_id = String(msg["user_id"]);
    console.log("Entering matchmaking: ", user_id)
    var game_id = parseInt(msg["game_id"]);
    users_info[user_id] = socket.id;
    match_queue[game_id].push(user_id)
    console.log(match_queue)
    if ( match_queue[game_id].length >= 2 ) {
      console.log("Match found.");
      var player1 = String( match_queue[game_id].shift() );
      var player2 = String( match_queue[game_id].shift() );
      if (player1 !== undefined && player2 !== undefined ) {
        if (player1 !== player2) 
          create_game(null, game_id, player1, player2, "online", null);
        else 
          match_queue[game_id].unshift(player1)
      } else {
        if (player1 !== undefined) match_queue[game_id].unshift(player1)
        if (player2 !== undefined) match_queue[game_id].unshift(player2)
      }
    }
  });

  socket.on("leave_matchmaking", (msg) => {
    
    var user_id = String(msg["user_id"]);
    console.log("Leaving matchmaking: ", user_id)
    var game_id = parseInt(msg["game_id"]);

    let user_idx = match_queue[game_id].indexOf(user_id);

    if ( socket.id === users_info[user_id] && user_idx > -1 )
      match_queue[game_id].splice( user_idx, 1 )
  })

  socket.on("forfeit_match", (msg) => {
    console.log("Forfeiting match: ", user_id)
    var user_id = String(msg["user_id"]);

    if ( socket.id === users_info[user_id] ) {
      var in_game_user_match_id = players_in_game[user_id]

      if ( in_game_user_match_id !== undefined ) {
        let game = current_games[in_game_user_match_id];
        game['state']['isFinished'] = true;
        game['state']['winner'] = (user_id === current_games[in_game_user_match_id]['state']['player1']) ? "2" : "1";
        finish_game(in_game_user_match_id, "forfeit")
      }
    }

  });

  //User sends match id, userid and new_pos when he wants to make a move in the game
  socket.on("move", (new_pos, user_id, match_id) => {
    user_id = String(user_id);
    match_id = String(match_id);
    
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

            let endMode = current_games[match_id]['state']['extra'];

            finish_game(match_id, endMode)
          
          }
        
        } else {
          //Move is not valid. Match will end and oponnent will win.
          let opponent = current_games[match_id]['users'][user_id][0]
          
          current_games[match_id]['state']['isFinished'] = true
          current_games[match_id]['state']['winner'] = (user_id === current_games[match_id]['state']['player1']) ? "2" : "1"
          
          finish_game(match_id, "invalid_move")
        }
  })

  
  //
  // END OF ONLINE GAME SECTION 
  // 



  //
  // TOURNAMENTS SECTION 
  // 

  //Tournament creator says that he wants to start a new round
  socket.on("tournament_newround", async (msg) => {
    var user_id = msg["user_id"];
    var tournament_id = parseInt(msg["tournament_id"]);

    users_info[user_id] = socket.id;

    var torneio = await Tournament.findByPk(tournament_id)
    torneio = torneio.dataValues

    if (user_id !== torneio.creator) {
      io.to( socket.id ).emit("round_start", {"erro": true});
      return
    }
    active_tournaments[torneio.id] = {}
    active_tournaments[torneio.id]["torneio_info"] = torneio
    active_tournaments[torneio.id]["players"] = {}
    active_tournaments[torneio.id]["rooms"] = {}


    //Buscar os jogos da proxima rodada (rodada que se vai iniciar) e criar as salas
    await TournamentMatch.findAll({where: {tournament_id: torneio.id, roundNo: torneio.current_round+1}}).then(newmatches => {
      for (let newmatch of newmatches) {
        let new_match_id = String(newmatch.dataValues.match_id)
        active_tournaments[torneio.id]["players"][newmatch.dataValues.player1] = new_match_id
        active_tournaments[torneio.id]["players"][newmatch.dataValues.player2] = new_match_id
        active_tournaments[torneio.id]["rooms"][new_match_id] = {"players_in": [], "started": false, "player1": newmatch.dataValues.player1, "player2": newmatch.dataValues.player2} 
      }
    }).catch(err => {
      io.to( socket.id ).emit("round_start", {"erro": true});
      return
    })

    //Buscar todos os jogadores ainda nao eliminados e enviar notificação
    TournamentUser.findAll({where: {tournament_id: torneio.id, eliminated: false}}).then(players_in_play => {
      for (let player of players_in_play) {
        let notification = {
          sender: torneio.creator,
          receiver: player.dataValues.user_id,
          notification_type: "R",
          notification_text: torneio.name + " iniciou um novo round! Faça o check-in para a sua partida."
        }
        Notification.create(notification);
      }
    }).catch(err => {
      io.to( socket.id ).emit("round_start", {"erro": true});
      return
    })

    // 5 minutes to check if everybody checked in
    setTimeout(() => { check_check_ins(torneio.id) }, 300000);


    //Atualizar o current_round para o round que vai arrancar
    await Tournament.update({current_round: (torneio.current_round + 1)}, {where: {id: torneio.id}}).then(success => {
      io.to( socket.id ).emit("round_start", {"erro": false});
    }).catch(err => {
      io.to( socket.id ).emit("round_start", {"erro": true});
    })


  });




  //Tournament Players checkin for their games
  socket.on("tournament_checkin", async (msg) => {
    var user_id = msg["user_id"];
    var tournament_id = msg["tournament_id"];

    users_info[user_id] = socket.id;

    if ( Object.keys(active_tournaments).includes(tournament_id) ) {
      if ( Object.keys(active_tournaments[tournament_id]["players"]).includes(String(user_id)) ) {
        var match_id = active_tournaments[tournament_id]["players"][String(user_id)]
        if (active_tournaments[tournament_id]["rooms"][match_id]["started"] === false) {
          if (!active_tournaments[tournament_id]["rooms"][match_id]["players_in"].includes(user_id) ) {
            active_tournaments[tournament_id]["rooms"][match_id]["players_in"].push(user_id)
          }
          io.to( socket.id ).emit("check_in", {"erro": false, "match_id": match_id});
        }
        io.to( socket.id ).emit("check_in", {"erro": true, "message": "Game has already started"});
      } else {
        io.to( socket.id ).emit("check_in", {"erro": true, "message": "You are not participating in this tournament"});
      }
    } else {
      io.to( socket.id ).emit("check_in", {"erro": true, "message": "Tournament is not active"});
    }

  });

  //Tournament Players Enters Game
  socket.on("tournament_enteredmatch", (msg) => {

    if (msg["user_id"] !== null) {
      var match_id = msg["match_id"]
      var user_id = msg["user_id"]
      var tournament_id = msg["tournament_id"]

      users_info[user_id] = socket.id
      
      //Verify tournament exists
      if ( Object.keys(active_tournaments).includes(tournament_id) ) {
        //Verify this user is on the tournament
        if ( Object.keys(active_tournaments[tournament_id]["players"]).includes(String(user_id)) ) {
          //Verify this user is already checked-in
          if ( active_tournaments[tournament_id]["rooms"][match_id]["players_in"].includes(user_id) ) {
            //Verify both users have already entered game
            if ( Object.keys(active_tournaments[tournament_id]["rooms"][match_id]["players_in"]).length === 2 ) {              
              var player1 = active_tournaments[tournament_id]["rooms"][match_id]["player1"]
              var player2 = active_tournaments[tournament_id]["rooms"][match_id]["player2"]
              active_tournaments[tournament_id]["rooms"][match_id]["started"] = true
              create_game(match_id, active_tournaments[tournament_id]["torneio_info"]["game_id"], player1, player2, "online", tournament_id)
            }
          } else {
            active_tournaments[tournament_id]["rooms"][match_id]["players_in"].push(user_id)
          }
        } else {
          io.to( socket.id ).emit("match_found", {"erro": true})
        }
      } else {
        io.to( socket.id ).emit("match_found", {"erro": true})
      }
    }
  })
});


async function check_check_ins(tournament_id) {

  if (Object.keys(active_tournaments).includes(String(tournament_id))) {
    for (let match_id in active_tournaments[String(tournament_id)]["rooms"]) {
      if (active_tournaments[String(tournament_id)]["rooms"][match_id]["players_in"].length < 2) {

        var winner = "1"
        var player1 = active_tournaments[String(tournament_id)]["rooms"][match_id]["player1"]
        var player2 = active_tournaments[String(tournament_id)]["rooms"][match_id]["player2"]

        if (active_tournaments[String(tournament_id)]["rooms"][match_id]["players_in"].length === 0) {
          // Noone has checked in for the match. Random player will pass
          var randomNumber = Math.round(Math.random())

          if (randomNumber === 1){
            winner = "1"
          } else {
            winner = "2"
          }
        }

        if (active_tournaments[String(tournament_id)]["rooms"][match_id]["players_in"].length === 1) {
          // 1 player has checked in. The other have not. The one who checked in wins.

          if (active_tournaments[String(tournament_id)]["rooms"][match_id]["players_in"].includes(player1)) {
            winner = "1"
          } else {
            winner = "2"
          }
        }

        await TournamentMatch.findOne({where: {tournament_id: tournament_id, match_id: match_id}}).then(async (game) => {
          if (game.dataValues.nextGame !== null ) {
            //Update Players playing next match in the tournament
            await TournamentMatch.findOne({where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).then(async (nextgame) => {
            if (game.dataValues.match_id === nextgame.dataValues.lastGame1) {
              // Player que venceu tem que ser colocado como player1 do proximo jogo no torneio
              if (winner == 1) {
                await TournamentMatch.update({player1 : player1}, {where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).catch(err => {
                  console.log(err)
                })
                await GameMatch.update({player1 : player1}, {where: {id: game.dataValues.nextGame}}).catch(err => {
                  console.log(err)
                })
              } else {
                await TournamentMatch.update({player1 : player2}, {where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).catch(err => {
                  console.log(err)
                })
                await GameMatch.update({player1 : player2}, {where: {id: game.dataValues.nextGame}}).catch(err => {
                  console.log(err)
                })
              }
            } else {
              // Player que venceu tem que ser colocado como player2 do proximo jogo no torneio
              if (winner == 1) {
                await TournamentMatch.update({player2 : player1}, {where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).catch(err => {
                  console.log(err)
                })
                await GameMatch.update({player2 : player1}, {where: {id: game.dataValues.nextGame}}).catch(err => {
                  console.log(err)
                })
              } else {
                await TournamentMatch.update({player2 : player2}, {where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).catch(err => {
                  console.log(err)
                })
                await GameMatch.update({player2 : player2}, {where: {id: game.dataValues.nextGame}}).catch(err => {
                  console.log(err)
                })
              }
            }
            })
          } else {
            // Last game from tournament
            // Update winner and state from tournament
            if (winner == 1)
              await Tournament.update({winner: player1, status: "FINISHED"}, {where: {id: tournament_id}})
            else
              await Tournament.update({winner: player2, status: "FINISHED"}, {where: {id: tournament_id}})
            
            delete active_tournaments[tournament_id];
          }
        })
    
        //Update winner from current match
        await GameMatch.update({winner: winner}, {where: {id: match_id}}).catch(err => {
          console.log(err)
        })
  
        //Update players that were eliminated from tournament
        if (winner == 1 ) {
          await TournamentUser.update({eliminated: true}, {where: {user_id: player2, tournament_id: tournament_id}}).catch(err => {
            console.log(err)
          })
        } else {
          await TournamentUser.update({eliminated: true}, {where: {user_id: player1, tournament_id: tournament_id}}).catch(err => {
            console.log(err)
          })
        }
        
      }
    } 
  }
}

function create_game(match_id, game_id, user1, user2, game_type, tournament_id) {
  user1 = String(user1);
  user2 = String(user2);

  if (match_id === null)
    match_id = Object.keys(current_games).length;

  current_games[match_id] = {};
  current_games[match_id]['game_id'] = game_id;
  current_games[match_id]['tournament'] = tournament_id
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
                                              current_games[match_id]['state']['isFinished'] = true;
                                              current_games[match_id]['state']['winner'] = "2";
                                              finish_game(match_id, "timeout");
                                            }, 300000);
  current_games[match_id]['timers'][user2] = new Timer(function() {
                                              current_games[match_id]['state']['isFinished'] = true;
                                              current_games[match_id]['state']['winner'] = "1";
                                              finish_game(match_id, "timeout");
                                            }, 300000);

  current_games[match_id]['timers'][user1].start();

  current_games[match_id]['state']['current_player'] = user1
  if (game_id === 0) {
    current_games[match_id]['state']['blocked_pos'] = new Set()
    current_games[match_id]['state']['current_pos'] = 18
    current_games[match_id]['state']['valid_squares'] = new Set([10, 11, 12, 17, 19, 24, 25, 26])
  } else if (game_id === 1) {
    current_games[match_id]['state']['player_0_valid_squares'] = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63"])
    current_games[match_id]['state']['player_1_valid_squares'] = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63"])
    current_games[match_id]['state']['player_0_first_move'] = true
    current_games[match_id]['state']['player_1_first_move'] = true
  }

  initiate_game(match_id)
  
}

function initiate_game(match_id) {
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
    else {
      username1 = u1.dataValues.username
      current_games[match_id]['users'][user1] = [ current_games[match_id]['users'][user1][0], true ]
    }
    console.log("username1: ", username1)

    if (u2 === null)
      username2 = user2
    else {
      username2 = u2.dataValues.username
      current_games[match_id]['users'][user2] = [ current_games[match_id]['users'][user2][0], true ]
    }

    players_in_game[user1] = match_id;
    players_in_game[user2] = match_id;
    io.to(users_info[user1]).emit("match_found", {"erro": false, "match_id": match_id, "player1": username1, "player2": username2});
    io.to(users_info[user2]).emit("match_found", {"erro": false, "match_id": match_id, "player1": username1, "player2": username2});
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

  if (current_games[match_id]['state']['current_player'] !== user_id) {
    return false
  }

  //Alternar entre player1 e player2 no current_player
  current_games[match_id]['state']['current_player'] = (current_games[match_id]['state']['current_player'] === current_games[match_id]['state']['player1'] ? current_games[match_id]['state']['player2'] : current_games[match_id]['state']['player1'])

  var current_pos = parseInt(new_pos)

  var valid_squares = current_games[match_id]['state']['valid_squares']
  var blocked_pos = current_games[match_id]['state']['blocked_pos']

  blocked_pos.add(current_pos)

  if ( valid_squares.has(current_pos) ) {
    valid_squares.clear()

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
  
  if ( !( (current_games[match_id]['state']['player_0_valid_squares'].has(new_pos) && current_games[match_id]['state']['current_player'] === user_id) 
      || (current_games[match_id]['state']['player_1_valid_squares'].has(new_pos) && current_games[match_id]['state']['current_player'] === user_id) ) )
      return false
  
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


//endMode: ["invalid_move", "valid_move", "timeout"]
async function finish_game(match_id, endMode) {
  let current_match = current_games[match_id]
  console.log("Terminating match ", match_id);
  var winner = current_match['state']['winner']
  var player1 = current_match['state']['player1']
  var player_1_account_player = current_match['users'][player1][1]
  var player2 = current_match['state']['player2'] 
  var player_2_account_player = current_match['users'][player2][1]
  var game_id = current_match['game_id']
  var game_type = current_match['game_type']

  current_match['timers'][player1].pause();
  current_match['timers'][player2].pause();

  let player1_final_result;
  let player2_final_result;
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
  
  if (current_match['tournament'] === null) {
    //Partida não é de torneio , por isso precisamos de criar a instância na BD

    // Create a GameMatch
    var gameMatch = {
      player1: parseInt(player1),
      player2: parseInt(player2),
      winner: winner,
      game_type: game_type,
      game_id: game_id
    };

    if (!player_1_account_player) {
      gameMatch["player1"] = null
    }
    if (!player_2_account_player) {
      gameMatch["player2"] = null
    }

    // Save GameMatch in the database
    await GameMatch.create(gameMatch)
  }
  

  if (player_1_account_player === true || player_2_account_player === true) {

    if (game_type === "online" && current_match['tournament'] === null) {
      // Jogo online modo competitivo
      var jogo = null;
      if (game_id === 0)
        jogo = "rastros"
      else if (game_id === 1)
        jogo = "gatos_e_caes"
      
      var player1_elo = 0
      var player2_elo = 0

      if (player_1_account_player) {
        await UserRank.findByPk(player1).then(ranks_player1 => {
          player1_elo = ranks_player1.dataValues[jogo]
        })
      } else {
        player1_elo = 700
      }

      if (player_2_account_player) {
        await UserRank.findByPk(player2).then(ranks_player2 => {
          player2_elo = ranks_player2.dataValues[jogo]
        })
      } else {
        player2_elo = 700
      }

      var higher_elo_difference
      var lower_elo_difference

      if (player1_elo > player2_elo) {
        higher_elo_difference = Math.round((1 / (1+Math.pow(10, (player2_elo-player1_elo)/400))) *50)
        lower_elo_difference = Math.round((1 / (1+Math.pow(10, (player1_elo-player2_elo)/400))) *50)
      } else {
        higher_elo_difference = Math.round((1 / (1+Math.pow(10, (player1_elo-player2_elo)/400))) *50)
        lower_elo_difference = Math.round((1 / (1+Math.pow(10, (player2_elo-player1_elo)/400))) *50)
      }

      if (winner === "1") {
        if (player1_elo > player2_elo) {
          player1_elo = player1_elo + lower_elo_difference
          player2_elo = player2_elo - lower_elo_difference
        } else {
          player1_elo = player1_elo + higher_elo_difference
          player2_elo = player2_elo - higher_elo_difference
        }

        if (player_1_account_player) {
          UserRank.update({ [jogo]: player1_elo}, {where: {user_id: player1}}).then(result => {console.log(result)}).catch(err => console.log(err));
        }
        if (player_2_account_player) {
          UserRank.update({ [jogo]: player2_elo}, {where: {user_id: player2}}).then(result => {console.log(result)}).catch(err => console.log(err));
        }

      } else if (winner === "2") {
        if (player1_elo > player2_elo) {
          player1_elo = player1_elo - higher_elo_difference
          player2_elo = player2_elo + higher_elo_difference
        } else {
          player1_elo = player1_elo - lower_elo_difference
          player2_elo = player2_elo + lower_elo_difference
        }

        if (player_2_account_player) {
          UserRank.update({ [jogo]: player2_elo}, {where: {user_id: player2}}).then(result => {console.log(result)}).catch(err => console.log(err));
        }
        if (player_1_account_player) {
          UserRank.update({ [jogo]: player1_elo}, {where: {user_id: player1}}).then(result => {console.log(result)}).catch(err => console.log(err));
        }
      }

    }
  }

  if (current_match['tournament'] !== null) {
    var tournament_id = current_match['tournament']

    await TournamentMatch.findOne({where: {tournament_id: tournament_id, match_id: match_id}}).then(async (game) => {
      if (game.dataValues.nextGame !== null ) {
        //Update Players playing next match in the tournament
        await TournamentMatch.findOne({where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).then(async (nextgame) => {
        if (game.dataValues.match_id === nextgame.dataValues.lastGame1) {
          // Player que venceu tem que ser colocado como player1 do proximo jogo no torneio
          if (winner == 1) {
            await TournamentMatch.update({player1 : player1}, {where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).catch(err => {
              console.log(err)
            })
            await GameMatch.update({player1 : player1}, {where: {id: game.dataValues.nextGame}}).catch(err => {
              console.log(err)
            })
          } else {
            await TournamentMatch.update({player1 : player2}, {where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).catch(err => {
              console.log(err)
            })
            await GameMatch.update({player1 : player2}, {where: {id: game.dataValues.nextGame}}).catch(err => {
              console.log(err)
            })
          }
        } else {
          // Player que venceu tem que ser colocado como player2 do proximo jogo no torneio
          if (winner == 1) {
            await TournamentMatch.update({player2 : player1}, {where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).catch(err => {
              console.log(err)
            })
            await GameMatch.update({player2 : player1}, {where: {id: game.dataValues.nextGame}}).catch(err => {
              console.log(err)
            })
          } else {
            await TournamentMatch.update({player2 : player2}, {where: {tournament_id: tournament_id, match_id: game.dataValues.nextGame}}).catch(err => {
              console.log(err)
            })
            await GameMatch.update({player2 : player2}, {where: {id: game.dataValues.nextGame}}).catch(err => {
              console.log(err)
            })
          }
        }
        })
      } else {
        // Last game from tournament
        // Update winner and state from tournament
        if (winner == 1)
          await Tournament.update({winner: player1, status: "FINISHED"}, {where: {id: tournament_id}}).catch(err => {
            console.log(err)
          })
        else
          await Tournament.update({winner: player2, status: "FINISHED"}, {where: {id: tournament_id}}).catch(err => {
            console.log(err)
          })
        
        delete active_tournaments[tournament_id];
      }
    })

    //Update winner from current match
    await GameMatch.update({winner: winner}, {where: {id: match_id}}).catch(err => {
      console.log(err)
    })

    //Update players that were eliminated from tournament
    if (winner == 1 ) {
      await TournamentUser.update({eliminated: true}, {where: {user_id: player2, tournament_id: tournament_id}}).catch(err => {
        console.log(err)
      })
    } else {
      await TournamentUser.update({eliminated: true}, {where: {user_id: player1, tournament_id: tournament_id}}).catch(err => {
        console.log(err)
      })
    }
  }

  io.to(users_info[player1]).emit("match_end", {"game_id": game_id, "match_id": match_id, "match_result": player1_final_result, "end_mode": endMode, "extra": current_games[match_id]['state']['extra']});
  io.to(users_info[player2]).emit("match_end", {"game_id": game_id, "match_id": match_id, "match_result": player2_final_result, "end_mode": endMode, "extra": current_games[match_id]['state']['extra']});

  delete current_games[match_id];
  delete active_friend_link[match_id];

  delete active_friend_invites[player1];
  delete active_friend_invites[player2];

  delete players_in_game[player1];
  delete players_in_game[player2];

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
require("./app/routes/report.routes.js")(app);

server.listen(port, () => console.log(`Listening on port ${port}`));
