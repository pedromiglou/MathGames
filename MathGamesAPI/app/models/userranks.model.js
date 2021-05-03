module.exports = (sequelize, Sequelize) => {
    const UserRank = sequelize.define("UserRanks", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      ranking: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNotNegative() {
                if (this.ranking < 0) {
                    throw new Error("Ranking must be >= 0")
                }
            }
        }
      }
    }, {
      timestamps: false
    });
    return UserRank;
  };

