module.exports = {
    HOST: "172.17.0.1",
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
