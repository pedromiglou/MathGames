module.exports = {
    HOST: "10.106.0.2",
    PORT: "3306",
    USER: "demo",
    PASSWORD: "password",
    DB: "demo",
    TIMEZONE: "+00:00",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
