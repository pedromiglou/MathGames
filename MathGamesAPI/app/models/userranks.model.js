const { user } = require(".");

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
        defaultValue: 0
      },
      gatos_e_caes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      timestamps: false,
      hooks: {
        beforeBulkUpdate: async (userrank) => {
          if (userrank.attributes.rastros < 0) {
            userrank.attributes.rastros = 0;
          } 
          if (userrank.attributes.gatos_e_caes < 0) {
            userrank.attributes.gatos_e_caes = 0;
          }
        }
      }
    });
    return UserRank;
  };

