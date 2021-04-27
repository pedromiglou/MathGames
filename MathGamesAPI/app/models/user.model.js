module.exports = (sequelize, Sequelize) => {
    const User2 = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      avatar: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      account_level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isNotNegative() {
                if (this.account_level < 0) {
                    throw new Error("Account level must be >= 0")
                }
            }
          }
      },
      account_type: {
        type: Sequelize.CHAR(1),
        allowNull: false,
        defaultValue: "U"
      }
    }, {
      timestamps: false
    });
    
    return User2;
  };

