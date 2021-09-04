const { authJwt } = require("../middleware");

module.exports = app => {
    const usersranks = require("../controllers/userranks.controller.js");
    var router = require("express").Router();

    /**
     * @swagger
     * /api/userranks/:
     *  get:
     *    description: Retrieve all Users ranks
     *    responses: 
     *      '200':
     *         description: Succesfully returned all users ranks
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin],  usersranks.findAll);
  
    /**
     * @swagger
     * /api/userranks/statistics/:gameName:
     *  get:
     *    description: Retrieve percentage of users per ranks by game id
     *    responses: 
     *      '200':
     *         description: Retrieve percentage of users per ranks with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/statistics/:gameName", authJwt.verifyToken, usersranks.statistics);

    /**
     * @swagger
     * /api/userranks/:userId:
     *  get:
     *    description: Retrieve ranks of an user by user id
     *    responses: 
     *      '200':
     *         description: Retrieve ranks of required user
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/:userId", authJwt.verifyToken, usersranks.findByUserId);
  
    /**
     * @swagger
     * /api/userranks/:userId:
     *  delete:
     *    description: Delete ranks of an user by user id
     *    responses: 
     *      '200':
     *         description: Deleted ranks succesfully
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:userId", [authJwt.verifyToken, authJwt.isAdmin],  usersranks.delete); 
  
    /**
     * @swagger
     * /api/userranks/:
     *  delete:
     *    description: Delete ranks of all users
     *    responses: 
     *      '200':
     *         description: Deleted ranks succesfully
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin],  usersranks.deleteAll); 
  
    app.use('/api/userranks', router);
  };