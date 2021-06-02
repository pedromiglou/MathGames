
module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define("Notifications", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      sender: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      receiver: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEqualSender() {
                if (this.sender == this.receiver) {
                    throw new Error("Error. Sender and Receiver cannot be the same.")
                }
            }
        }
      },
      notification_type: {
          type: Sequelize.CHAR(1),
          allowNull: false
      }
    }, {
      timestamps: true
    });
    return Notification;
  };

