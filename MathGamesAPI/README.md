# How to run

## docker run --name mysql8 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=demo -e MYSQL_USER=demo -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql/mysql-server:8.0.23
Run the MySQL database container

## npm install
Install the needed dependencies.

## npm start
Run the node server in development mode.

## npm run-script start-prod
Run the node server in production mode.

# Known Problems

Se der erro "Access denied for user 'root'@'172.17.0.1' (using password: YES)"
docker exec -t -i mysql8 /bin/bash
mysql -uroot -ppassword
CREATE USER 'root'@'172.17.0.1' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'172.17.0.1' WITH GRANT OPTION;
ALTER USER 'root'@'172.17.0.1' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
exit;
