const bodyParser = require("body-parser");
//const helmet = require("helmet");
const cors = require('cors')
const express = require("express");
const index = require("./app/routes/index")

const app = express();
app.use(index);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = require("http").createServer(app)

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  }
});


const port = process.env.PORT || 4000;

/*
let interval;

var myconnections = new Set()

io.on("connection", (socket) => {
  console.log("New client connected");
  myconnections.add(socket)

  socket.on('client-server', (msg) => {
    console.log("aqui")
    console.log(msg)
    console.log(myconnections.size)
    myconnections.forEach( element => {
      console.log("vai")
      if (socket != element) {
        element.emit('server-client', msg);
      }
    } ) 
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    myconnections.delete(socket)
  });
});


const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client

  socket.emit("FromAPI", response);
};
*/

require("./app/routes/user.routes.js")(app);
require("./app/routes/game.routes.js")(app);
require("./app/routes/gamematch.routes.js")(app);
require("./app/routes/userranks.routes.js")(app);
require("./app/routes/ban.routes.js")(app);
require("./app/routes/tournament.routes.js")(app);
require("./app/routes/tournamentmatches.routes.js")(app);
require("./app/routes/tournamentusers.routes.js")(app);
require("./app/routes/friend.routes.js")(app);


server.listen(port, () => console.log(`Listening on port ${port}`));
