
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
      }
    }, {
      timestamps: false
    });
    return TournamentMatch;
  };

