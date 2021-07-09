const { authJwt} = require("../middleware");

module.exports = app => {
    const tournamentUsers = require("../controllers/tournamentusers.controller.js");
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/tournamentusers/:
     *  get:
     *    description: Retrieves all tournaments information
     *    responses: 
     *      '200':
     *         description: Retrieved all tournaments with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], tournamentUsers.findAll);
  
    /**
     * @swagger
     * /api/tournamentusers/findbytournament/:id:
     *  get:
     *    description: Retrieves all users of a tournament by tournament id
     *    responses: 
     *      '200':
     *         description: Retrieved all users with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/findbytournament/:id", [authJwt.verifyToken], tournamentUsers.findUsersByTournament);

    /**
     * @swagger
     * /api/tournamentusers/findbyuser/:id:
     *  get:
     *    description: Retrieves all tournaments of a user by user id
     *    responses: 
     *      '200':
     *         description: Retrieved all tournaments with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/findbyuser/:id", [authJwt.verifyToken], tournamentUsers.findTournamentsByUser);
  
    /**
     * @swagger
     * /api/tournamentusers/:tournamentId/:userId:
     *  delete:
     *    description: Removes a user from participanting in a tournament by both entities id
     *    responses: 
     *      '200':
     *         description: Removed association with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:tournamentId/:userId", [authJwt.verifyToken], tournamentUsers.delete);
  
    /**
     * @swagger
     * /api/tournamentusers/:
     *  delete:
     *    description: Removes all users from participanting in all tournaments
     *    responses: 
     *      '200':
     *         description: Removed all associations with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], tournamentUsers.deleteAll);
  
    app.use('/api/tournamentusers', router);
  };