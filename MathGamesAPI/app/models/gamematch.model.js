module.exports = (sequelize, Sequelize) => {
    const GameMatch = sequelize.define("GameMatches", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      player1: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      player2: {
        type: Sequelize.INTEGER,
        validate: {
            isDiferent() {
                if (this.player1 == this.player2) {
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
      number_moves: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNotNegative() {
                if (this.number_moves < 0) {
                    throw new Error("Number of moves cannot be < 0.")
                }
            }
        }
      },
      game_type: {
        type: Sequelize.CHAR(1),
        allowNull: false
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      actual_state: {
        type: Sequelize.STRING(500)
      }
    }, {
      timestamps: false
    });
    
    return GameMatch;
  };

