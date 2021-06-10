
module.exports = (sequelize, Sequelize) => {
    const TournamentMatch = sequelize.define("TournamentMatches", {
      match_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
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

