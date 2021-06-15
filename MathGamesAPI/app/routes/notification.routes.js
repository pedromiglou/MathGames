const { authJwt } = require("../middleware");

module.exports = app => {
    const notifications = require("../controllers/notification.controller.js");
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/notifications/:
     *  post:
     *    description: Creates a new notification
     *    responses: 
     *      '200':
     *         description: Created a new notification with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/", authJwt.verifyToken, notifications.create);
  
    /**
     * @swagger
     * /api/notifications/:
     *  get:
     *    description: Retrieves all notifications
     *    responses: 
     *      '200':
     *         description: Retrieved all notifications with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin],  notifications.findAll);
  
    /**
     * @swagger
     * /api/notifications/:id:
     *  get:
     *    description: Retrieves a notification by notification id
     *    responses: 
     *      '200':
     *         description: Retrieved required notification with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/:id", authJwt.verifyToken, notifications.findByUserId);
  
    /**
     * @swagger
     * /api/notifications/:id:
     *  delete:
     *    description: Delete a notification by notification id
     *    responses: 
     *      '200':
     *         description: Deleted required notification with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:id", authJwt.verifyToken, notifications.delete);
  
    /**
     * @swagger
     * /api/notifications/:
     *  delete:
     *    description: Delete all notifications 
     *    responses: 
     *      '200':
     *         description: Deleted all notifications with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], notifications.deleteAll);
  
    app.use('/api/notifications', router);
  };