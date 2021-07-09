const { authJwt } = require("../middleware");

module.exports = app => {
    const friends = require("../controllers/friend.controller.js");
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/friends/:
     *  post:
     *    description: Creates a new friend relation
     *    responses: 
     *      '200':
     *         description: New friend was created with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/", authJwt.verifyToken, friends.create);
  
    /**
     * @swagger
     * /api/friends/:
     *  get:
     *    description: Retrieves all friends relations
     *    responses: 
     *      '200':
     *         description: Retrieved all friends with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], friends.findAll);
  
    /**
     * @swagger
     * /api/friends/:id:
     *  get:
     *    description: Retrieves a friend relation by friend id
     *    responses: 
     *      '200':
     *         description: Retrieved friend relation with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/:id", authJwt.verifyToken, friends.findByUserId);
  
    /**
     * @swagger
     * /api/friends/:friendId1/:friendId2:
     *  delete:
     *    description: Deletes a friend relation by both persons id
     *    responses: 
     *      '200':
     *         description: Friend relation was deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:friendId1/:friendId2", authJwt.verifyToken,  friends.delete);
  
    /**
     * @swagger
     * /api/friends/:
     *  delete:
     *    description: Deletes all friend relations
     *    responses: 
     *      '200':
     *         description: All friends deleted with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], friends.deleteAll);
  
    app.use('/api/friends', router);
  };