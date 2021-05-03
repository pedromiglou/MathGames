const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");


var connection = mysql.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  timezone: dbConfig.TIMEZONE

});

/*
pool.on('connection', function (_conn) {
    if (_conn) {
        logger.info('Connected the database via threadId %d!!', _conn.threadId);
        _conn.query('SET SESSION auto_increment_increment=1');
    }
});*/

module.exports = connection;









/*

var easy_mysql = require('easy-mysql');

var options = {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user:  dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    pool_size: 50
};

var pool = easy_mysql.connect_with_easy_pool(options);

//this is here so it fills in the place of mysql-simple-pool while i port stuff over
module.exports.query = function(sql, params, callback) {
    if ("function" == typeof params) {
        callback = params;
        params = [];
    }
    pool.get_all(sql, params, callback);
};

module.exports.get_all = pool.get_all; //these are here so i can slowly port stuff over
module.exports.get_one = pool.get_one; 
module.exports.execute = pool.execute;
*/