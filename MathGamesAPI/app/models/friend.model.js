
module.exports = (sequelize, Sequelize) => {
    const Friend = sequelize.define("friend", {
      friend1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      friend2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
            isDiferent() {
                if (this.friend1 >= this.friend2) {
                    throw new Error("Friend1 must be < than Friend2")
                }
            }
        }
      }
    }, {
      timestamps: false
    });
    return Friend;
  };

