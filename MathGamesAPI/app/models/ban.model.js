
module.exports = (sequelize, Sequelize) => {
    const Ban = sequelize.define("Bans", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      reason: {
        type: Sequelize.STRING(200)
      }
    }, {
      timestamps: false
    });
    return Ban;
  };

