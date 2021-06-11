const { authJwt} = require("../middleware");

module.exports = app => {
    const tournamentUsers = require("../controllers/tournamentusers.controller.js");
    var router = require("express").Router();
  
    // Retrieve all tournamentUsers
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], tournamentUsers.findAll);
  
    // Retrieve all users of a tournament with the tournament id
    router.get("/findbytournament/:id", [authJwt.verifyToken], tournamentUsers.findUsersByTournament);

    // Retrieve a all users of a tournament with the tournament id
    router.get("/findbyuser/:id", [authJwt.verifyToken], tournamentUsers.findTournamentsByUser);
  
    // Delete a tournamentUser with Ids
    router.delete("/:tournamentId/:userId", [authJwt.verifyToken], tournamentUsers.delete);
  
    // Delete all tournamentUsers
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], tournamentUsers.deleteAll);
  
    app.use('/api/tournamentusers', router);
  };