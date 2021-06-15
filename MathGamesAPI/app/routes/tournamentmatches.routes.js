const { authJwt} = require("../middleware");

module.exports = app => {
    const tournamentmatches = require("../controllers/tournamentmatches.controller.js");
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/tournamentmatches/:
     *  post:
     *    description: Creates a new match from a tournament
     *    responses: 
     *      '200':
     *         description: Match created with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/", [authJwt.verifyToken, authJwt.isTournamentManager], tournamentmatches.create);
  
    /**
     * @swagger
     * /api/tournamentmatches/:
     *  get:
     *    description: Retrieves information from all tournament matches
     *    responses: 
     *      '200':
     *         description: Retrieved all tournament matches with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", [authJwt.verifyToken], tournamentmatches.findAll);

    /**
     * @swagger
     * /api/tournamentmatches/findbytournament/:id:
     *  get:
     *    description: Retrieves all matches from a specific tournament by tournament id
     *    responses: 
     *      '200':
     *         description: Retrieved all required matches with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/findbytournament/:id", [authJwt.verifyToken], tournamentmatches.findMatchesByTournament);
  
    /**
     * @swagger
     * /api/tournamentmatches/:id:
     *  put:
     *    description: Updates information from a specific tournament match by tournament_match_id
     *    responses: 
     *      '200':
     *         description: Tournament match updated with sucess
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.put("/:id", [authJwt.verifyToken, authJwt.isTournamentManager], tournamentmatches.update);
  
    /**
     * @swagger
     * /api/tournamentmatches/id:
     *  delete:
     *    description: Deletes a tournament match by tournament_match_id
     *    responses: 
     *      '200':
     *         description: Tournament match deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:id", [authJwt.verifyToken, authJwt.isTournamentManager], tournamentmatches.delete);
  
    /**
     * @swagger
     * /api/tournamentmatches/:
     *  delete:
     *    description: Deletes all tournament matches
     *    responses: 
     *      '200':
     *         description: All tournament matches were deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], tournamentmatches.deleteAll);
  
    app.use('/api/tournamentmatches', router);
  };