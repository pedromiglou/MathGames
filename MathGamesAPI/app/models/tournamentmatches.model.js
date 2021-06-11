
module.exports = (sequelize, Sequelize) => {
    const TournamentMatch = sequelize.define("TournamentMatches", {
      match_id: {
        type: Sequelize.INTEGER,
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
      tournament_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      roundNo: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      bye: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      lastGame1: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lastGame2: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      nextGame: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    }, {
      timestamps: false
    });
    return TournamentMatch;
  };

