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
        type: Sequelize.INTEGER,
        validate: {
            winnerValue() {
                if (!(this.winner == null || this.winner == this.player1 || this.winner == this.player2)) {
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
      timestamps: true
    });
    
    return GameMatch;
  };

