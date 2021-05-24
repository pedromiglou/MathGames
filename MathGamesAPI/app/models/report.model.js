
module.exports = (sequelize, Sequelize) => {
    const Report = sequelize.define("Reports", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      sender: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false
      },
      receiver: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: false,
        validate: {
            isDiferent() {
                if (this.sender == this.receiver) {
                    throw new Error("Sender and Receiver are equal.")
                }
            }
        }
      },
      reason: {
        type: Sequelize.STRING(200),
        validate: {
            isValid() {
                if (!["Cheats", "Bug Abuse"].includes(this.reason)) {
                    throw new Error("Invalid Reason.")
                }
            }
        }
      }
    }, {
      timestamps: true
    });
    return Report;
  };

