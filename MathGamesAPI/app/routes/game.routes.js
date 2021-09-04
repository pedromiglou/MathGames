const { authJwt } = require("../middleware");

module.exports = app => {
    const games = require("../controllers/game.controller.js");
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/games/:
     *  post:
     *    description: Creates a new game
     *    responses: 
     *      '200':
     *         description: New game was created succesfully
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], games.create);
  
    /**
     * @swagger
     * /api/games/:
     *  get:
     *    description: Retrieves all games
     *    responses: 
     *      '200':
     *         description: Retrieved all games with succesfully
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", games.findAll);
  
    /**
     * @swagger
     * /api/games/:id:
     *  get:
     *    description: Retrieves a game by game id
     *    responses: 
     *      '200':
     *         description: Retrieved required game with success
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/:id", games.findOne);

    /**
     * @swagger
     * /api/games/:id:
     *  put:
     *    description: Updated a game by game id
     *    responses: 
     *      '200':
     *         description: Game was updated with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], games.update);
  
    /**
     * @swagger
     * /api/games/:id:
     *  delete:
     *    description: Deletes a game by game id
     *    responses: 
     *      '200':
     *         description: Game was deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], games.delete);
  
    /**
     * @swagger
     * /api/games/:
     *  delete:
     *    description: Deletes all games
     *    responses: 
     *      '200':
     *         description: All games were deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], games.deleteAll);
  
    app.use('/api/games', router);
  };