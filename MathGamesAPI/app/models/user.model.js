const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 20]
        }
      },
      email: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false
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
      },
      avatar_color: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "#FFAF00"
      },
      avatar_hat: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "none"
      },
      avatar_shirt: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "none"
      },
      avatar_accessorie: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "none"
      },
      avatar_trouser: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "none"
      },
      banned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
         if (!user.password.match(/^(?=.*\d)(?=.*[a-zA-Z]).{5,25}$/)) {
          throw new Error("Password invalid")
         }
         if (user.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.password = bcrypt.hashSync(user.password, salt);
         }
        },
        beforeBulkUpdate:async (user) => {
         if (user.attributes.password) {
          const salt = await bcrypt.genSaltSync(10, 'a');
          user.attributes.password = bcrypt.hashSync(user.attributes.password, salt);
         }
        }
       },
       instanceMethods: {
        validPassword: (password) => {
         return bcrypt.compareSync(password, this.password);
        }
       }
    });
    
    User.prototype.validPassword = async (password, hash) => {
      return await bcrypt.compareSync(password, hash);
     }

    return User;
  };

