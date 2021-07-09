const { authJwt } = require("../middleware");

module.exports = app => {
    const matches = require("../controllers/gamematch.controller.js");
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/matches/:
     *  post:
     *    description: Creates a new match
     *    responses: 
     *      '200':
     *         description: New match was created succesfully
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], matches.create);
  
    /**
     * @swagger
     * /api/matches/:
     *  get:
     *    description: Retrieves information of all matches
     *    responses: 
     *      '200':
     *         description: Retrieved information with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", authJwt.verifyToken, matches.findAll);

    /**
     * @swagger
     * /api/matches/statistics:
     *  get:
     *    description: Retrieves statistics regarding games played per day
     *    responses: 
     *      '200':
     *         description: Retrieved required statistics successfully
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/statistics", [authJwt.verifyToken, authJwt.isAdmin], matches.statistics);

    /**
     * @swagger
     * /api/matches/statisticsbygame:
     *  get:
     *    description: Retrieves statistics regarding percentage of each game played
     *    responses: 
     *      '200':
     *         description: Retrieved required statistics successfully
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/statisticsbygame", matches.statisticsbygame);
  
    /**
     * @swagger
     * /api/matches/:id:
     *  get:
     *    description: Retrieves information of match by match id
     *    responses: 
     *      '200':
     *         description: Retrieved required match information succesfully
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/:id", authJwt.verifyToken, matches.findOne);

    /**
     * @swagger
     * /api/matches/:id:
     *  put:
     *    description: Updates a match by match id
     *    responses: 
     *      '200':
     *         description: Match was updated with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], matches.update);
  
    /**
     * @swagger
     * /api/matches/:id:
     *  delete:
     *    description: Deletes a match by match id
     *    responses: 
     *      '200':
     *         description: Match was deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], matches.delete);
  
    /**
     * @swagger
     * /api/matches/:
     *  delete:
     *    description: Deletes all matchs
     *    responses: 
     *      '200':
     *         description: All matches were deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], matches.deleteAll);
  
    app.use('/api/matches', router);
  };