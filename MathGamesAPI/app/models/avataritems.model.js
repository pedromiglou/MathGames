
module.exports = (sequelize, Sequelize) => {
    const AvatarItem = sequelize.define("AvatarItems", {
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    }, {
      timestamps: false
    });
    return AvatarItem;
  };

