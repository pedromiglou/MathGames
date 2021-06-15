const { authJwt} = require("../middleware");

module.exports = app => {
    const tournaments = require("../controllers/tournament.controller.js");
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/tournaments/:
     *  post:
     *    description: Creates a new tournament
     *    responses: 
     *      '200':
     *         description: Tournament created with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/", [authJwt.verifyToken, authJwt.isTournamentManager], tournaments.create);

    /**
     * @swagger
     * /api/tournaments/joins:
     *  post:
     *    description: Player wants to join a tournament
     *    responses: 
     *      '200':
     *         description: Player joinned tournament with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/join", [authJwt.verifyToken], tournaments.join);

    /**
     * @swagger
     * /api/tournaments/initialize:
     *  post:
     *    description: Tournament owner wants to initialize the tournament. Instances are created on the database
     *    responses: 
     *      '200':
     *         description: Tournament starts with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/initialize", [authJwt.verifyToken], tournaments.initialize);

    /**
     * @swagger
     * /api/tournaments/initializeround:
     *  post:
     *    description: Tournament owner wants to initialize a new round
     *    responses: 
     *      '200':
     *         description: New round is initialized with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/initializeround", [authJwt.verifyToken], tournaments.initializeround);
  
    /**
     * @swagger
     * /api/tournaments/:
     *  get:
     *    description: Retrieves information regarding all tournaments
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
    router.get("/", [authJwt.verifyToken], tournaments.findAll);
  
    /**
     * @swagger
     * /api/tournaments/:id:
     *  get:
     *    description: Retrieves information of a tournament by tournament id
     *    responses: 
     *      '200':
     *         description: Retrieved required tournament with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/:id", [authJwt.verifyToken], tournaments.findOne);

    /**
     * @swagger
     * /api/tournaments/:id:
     *  put:
     *    description: Updates tournament information by tournament id
     *    responses: 
     *      '200':
     *         description: Tournament is updated with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.put("/:id", [authJwt.verifyToken], tournaments.update);
  
    /**
     * @swagger
     * /api/tournaments/:id:
     *  delete:
     *    description: Delete tournament by tournament id
     *    responses: 
     *      '200':
     *         description: Tournament was deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:id", [authJwt.verifyToken], tournaments.delete);
  
    /**
     * @swagger
     * /api/tournaments/:
     *  delete:
     *    description: Delete all tournaments
     *    responses: 
     *      '200':
     *         description: All tournaments was deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], tournaments.deleteAll);
  
    app.use('/api/tournaments', router);
  };