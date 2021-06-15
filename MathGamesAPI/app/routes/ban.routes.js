const { authJwt } = require("../middleware");


module.exports = app => {
    const bans = require("../controllers/ban.controller.js");
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/bans/:
     *  post:
     *    description: Creates a new ban
     *    responses: 
     *      '200':
     *         description: Ban was created with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/",  [authJwt.verifyToken, authJwt.isAdmin],  bans.create);
  
    /**
     * @swagger
     * /api/bans/:
     *  get:
     *    description: Retrieves all bans
     *    responses: 
     *      '200':
     *         description: Retrieved all bans with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin],  bans.findAll);

    /**
     * @swagger
     * /api/bans/statistics:
     *  get:
     *    description: Retrieves statistics regarding players banned
     *    responses: 
     *      '200':
     *         description: Retrieved required statistics with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/statistics", [authJwt.verifyToken, authJwt.isAdmin], bans.statistics);

    /**
     * @swagger
     * /api/bans/:id:
     *  get:
     *    description: Retrieve a ban by ban id
     *    responses: 
     *      '200':
     *         description: Retrieved required ban with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin],  bans.findOne);
  
    /**
     * @swagger
     * /api/bans/:
     *  delete:
     *    description: Deletes all bans
     *    responses: 
     *      '200':
     *         description: All bans deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], bans.deleteAll);

    /**
     * @swagger
     * /api/bans/:id:
     *  delete:
     *    description: Delete a ban by ban id
     *    responses: 
     *      '200':
     *         description: Deleted required ban with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:id",  [authJwt.verifyToken, authJwt.isAdmin], bans.delete);
  
    app.use('/api/bans', router);
  };