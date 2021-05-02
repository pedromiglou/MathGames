
module.exports = (sequelize, Sequelize) => {
    const TournamentUser = sequelize.define("TournamentUsers", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      tournament_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      eliminated: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    }, {
      timestamps: false
    });
    return TournamentUser;
  };

