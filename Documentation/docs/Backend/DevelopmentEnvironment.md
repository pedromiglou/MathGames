# Backend Development Environment

## Installing Dependencies

### Installing Node.js

Node.js is required for building the frontend application. It can be installing by following the instructions on the [distributions github page](https://github.com/nodesource/distributions).
Node v14 was used during development, and should be the one installed. After installing node, the package manager npm will also be available, which is used for managing the backend's packages.

## Getting the Code

The code can be found in the [MathGames GitLab repository](https://gitlab.com/Miglou/pi_mathgames).
The backend application can be found in the MathGamesAPI directory.

```
git clone https://gitlab.com/Miglou/pi_mathgames.git
cd MathGamesAPI
```

## Setting up the Containers

To run the development MySQL database container, run the following command:
```
docker run --name mysql8 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=demo -e MYSQL_USER=demo -e MYSQL_PASSWORD=password -p 3306:3306 -d mysql/mysql-server:8.0.23
```

## Running the Application

After cloning the repository and setting up the containers, install the dependencies and run the application using npm.
```
npm install
npm start
```
