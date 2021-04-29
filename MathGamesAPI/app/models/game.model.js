module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("game", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isNotNegative() {
                if (this.age <= 0) {
                    throw new Error("Age must be > 0")
                }
            }
        }
      }
    }, {
      timestamps: false
    });
    
    return Game;
  };

