module.exports = (sequelize, Sequelize) => {
    const UserRank = sequelize.define("UserRanks", {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      rastros: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isNotNegative() {
              if (this.rastros < 0) {
                  throw new Error("Rastros ranking must be >= 0")
              }
          }
        }
      },
      gatos_e_caes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isNotNegative() {
              if (this.gatos_e_caes < 0) {
                  throw new Error("Gatos e Caes ranking must be >= 0")
              }
          }
        }
      }
    }, {
      timestamps: false
    });
    return UserRank;
  };

