
module.exports = (sequelize, Sequelize) => {
    const Tournament = sequelize.define("Tournaments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(70),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      max_users: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            greaterThan2() {
                if (this.max_users <= 2) {
                    throw new Error("Number of max users must be greater than 2")
                }
            }
        }
      },
      private: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }, 
      password: {
        type: Sequelize.STRING(30)
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      winner: {
        type: Sequelize.INTEGER
      },
      creator: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false
      }
    }, {
      timestamps: false
    });
    return Tournament;
  };

