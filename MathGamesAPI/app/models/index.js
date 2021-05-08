const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectOptions: {
    // useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true,
    timezone: "utc"
  },
  timezone: "+01:00", //for writing to database
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.ban = require("./ban.model.js")(sequelize, Sequelize);
db.friend = require("./friend.model.js")(sequelize, Sequelize);
db.game = require("./game.model.js")(sequelize, Sequelize);
db.game_match = require("./gamematch.model.js")(sequelize, Sequelize);
db.tournament = require("./tournament.model.js")(sequelize, Sequelize);
db.tournament_matches = require("./tournamentmatches.model.js")(sequelize, Sequelize);
db.tournament_users = require("./tournamentusers.model.js")(sequelize, Sequelize);
db.user_ranks = require("./userranks.model.js")(sequelize, Sequelize);
db.notifications = require("./notification.model.js")(sequelize, Sequelize);

db.ban.belongsTo(db.user, {through: "users",foreignKey: 'user_id', as: 'user'});
db.friend.belongsTo(db.user, {through: "users", foreignKey: 'friend1', as: 'friend_1'})
db.friend.belongsTo(db.user, {through: "users", foreignKey: 'friend2', as: 'friend_2'})
db.game_match.belongsTo(db.user, {through: "users", foreignKey: 'player1', as: 'player_1'})
db.game_match.belongsTo(db.user, {through: "users", foreignKey: 'player2', as: 'player_2'})
db.game_match.belongsTo(db.game, {through: "games", foreignKey: 'game_id', as: 'game'})
db.tournament.belongsTo(db.user, {through: "users", foreignKey: 'winner', as: 'winner_user'})
db.tournament.belongsTo(db.user, {through: "users", foreignKey: 'creator', as: 'creator_user'})
db.tournament.belongsTo(db.game, {through: "games", foreignKey: 'game_id', as: 'game'})
db.tournament_matches.belongsTo(db.game_match, {through: "game_match", foreignKey: 'match_id', as: 'match'})
db.tournament_matches.belongsTo(db.tournament, {through: "tournament", foreignKey: 'tournament_id', as: 'tournament'})
db.tournament_users.belongsTo(db.user, {through: "users", foreignKey: 'user_id', as: 'user'})
db.tournament_users.belongsTo(db.tournament, {through: "tournament", foreignKey: 'tournament_id', as: 'tournament'})
db.user_ranks.belongsTo(db.user, {through: "users", foreignKey: 'user_id', as: 'user'})
db.user_ranks.belongsTo(db.game, {through: "games", foreignKey: 'game_id', as: 'game'})
db.notifications.belongsTo(db.user, {through: "users", foreignKey: 'sender', as: 'sender_user'})
db.notifications.belongsTo(db.user, {through: "users", foreignKey: 'receiver', as: 'receiver_user'})

module.exports = db;