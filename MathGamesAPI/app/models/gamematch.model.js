module.exports = (sequelize, Sequelize) => {
    const GameMatch = sequelize.define("GameMatches", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      player1: {
        type: Sequelize.INTEGER
      },
      player2: {
        type: Sequelize.INTEGER,
        validate: {
            isDiferent() {
                if (this.player1 == this.player2 && (this.player1 !== null && this.player2 !== null) ) {
                    throw new Error("Players are the same")
                }
            }
        }
      },
      winner: {
        type: Sequelize.CHAR(1),
        validate: {
            winnerValue() {
                if (!(this.winner == "1" || this.winner == "X" || this.winner == "2")) {
                    throw new Error("Winner value error")
                }
            }
        }
      },
      game_type: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: true,
      hooks: {
        afterCreate: async (game_match) => {
          console.log("entrei aqui");
          console.log(game_match);
          let winner = game_match.winner;
          let player1 = game_match.player1;
          let player2 = game_match.player2;
          console.log(winner);
          if (winner !== "X") {
            //alguem ganhou
            if (player1 !== null && player2 !== null ) {
              // ambos tem conta
              let loser = winner === "1" ? player2 : player1;
              let winner_id = winner === "1" ? player1: player2;
              // winner recebe 100xp loser recebe 30xp
              sequelize.models.Users.increment('account_level', { by: 100, where: { id: winner_id}})
              sequelize.models.Users.increment('account_level', { by: 30, where: { id: loser}})
            }
            if (player1 !== null && player2 === null ) {
              // player2 nao tem conta
              if (winner === "1") {
                // player 1 recebe 100xp
                sequelize.models.Users.increment('account_level', { by: 100, where: { id: player1}})
              } else {
                // player 1 recebe 30xp
                sequelize.models.Users.increment('account_level', { by: 30, where: { id: player1}})
              }
            }
            if (player1 === null && player2 !== null ) {
              // player1 nao tem conta
              if (winner === "2") {
                // player2 recebe 100xp
                sequelize.models.Users.increment('account_level', { by: 100, where: { id: player2}})
              } else {
                // player 2 recebe 30xp
                sequelize.models.Users.increment('account_level', { by: 30, where: { id: player2}})
              }
            }

          } else {
            //ficou empatado
            if (player1 !== null && player2 !== null ) {
              // ambos tem conta
              // players recebem 45xp
              sequelize.models.Users.increment('account_level', { by: 45, where: { id: player1}})
              sequelize.models.Users.increment('account_level', { by: 45, where: { id: player2}})
            }
            if (player1 !== null && player2 === null) {
              sequelize.models.Users.increment('account_level', { by: 45, where: { id: player1}})
            }
            if (player1 === null && player2 !== null ) {
              sequelize.models.Users.increment('account_level', { by: 45, where: { id: player2}})
            }
          }
        }
      }
    });
    
    return GameMatch;
  };

