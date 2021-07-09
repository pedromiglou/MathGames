const authorize = require('../config/authorize')
const Role = require('../config/roles');
const { authJwt, verifySignUp } = require("../middleware");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/users/:
     *  get:
     *    description: Retrieve all Users
     *    responses: 
     *      '200':
     *         description: Succesfully returned all users
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", users.findAll);

    /**
     * @swagger
     * /api/users/statistics:
     *  get:
     *    description: Retrieve ban statistics
     *    responses: 
     *      '200':
     *         description: Succesfully returned statistics regarding bans
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/statistics", [authJwt.verifyToken, authJwt.isAdmin], users.statistics)

    /**
     * @swagger
     * /api/users/banned:
     *  get:
     *    description: Retrieve all Users that have been banned
     *    responses: 
     *      '200':
     *         description: Succesfully returned all users banned
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/banned", [authJwt.verifyToken, authJwt.isAdmin], users.findAllBanned);

    /**
     * @swagger
     * /api/users/normal:
     *  get:
     *    description: Retrieve all Users with admin permissions
     *    responses: 
     *      '200':
     *         description: Succesfully returned all users with admin permissions
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/normal", [authJwt.verifyToken, authJwt.isAdmin], users.findAllNormal);

    /**
     * @swagger
     * /api/users/privilege:
     *  get:
     *    description: Retrieve all Users with tournament permissions
     *    responses: 
     *      '200':
     *         description: Succesfully returned all users with tournament permissions
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/privilege", [authJwt.verifyToken, authJwt.isAdmin], users.findAllPrivilege);

    /**
     * @swagger
     * /api/users/admin:
     *  get:
     *    description: Retrieve all Users with admin permissions
     *    responses: 
     *      '200':
     *         description: Succesfully returned all users with admin permissions
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], users.findAllAdmin);

    /**
     * @swagger
     * /api/users/username/:name:
     *  get:
     *    description: Retrieve a single user by username
     *    responses: 
     *      '200':
     *         description: Succesfully returned requested user    
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/username/:name", users.findByName);

    /**
     * @swagger
     * /api/users/:id:
     *  get:
     *    description: Retrieve a single user by id
     *    responses: 
     *      '200':
     *         description: Succesfully returned requested user
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/:id", users.findOne);
  
    /**
     * @swagger
     * /api/users/:id:
     *  put:
     *    description: Updates a user by id
     *    responses: 
     *      '200':
     *         description: Succesfully updated requested user
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.put("/:id", authJwt.verifyToken, users.update);

    /**
     * @swagger
     * /api/users/upgrade/:id:
     *  put:
     *    description: Upgrades the privileges of a user by id
     *    responses: 
     *      '200':
     *         description: Succesfully upgraded requested user
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.put("/upgrade/:id", [authJwt.verifyToken, authJwt.isAdmin], users.upgrade_account);

    /**
     * @swagger
     * /api/users/downgrade/:id:
     *  put:
     *    description: Downgrades the privileges of a user by id
     *    responses: 
     *      '200':
     *         description: Succesfully downgraded requested user
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.put("/downgrade/:id",  [authJwt.verifyToken, authJwt.isAdmin], users.downgrade_account);

    /**
     * @swagger
     * /api/users/:id:
     *  delete:
     *    description: Deletes an user by id
     *    responses: 
     *      '200':
     *         description: Succesfully deleted requested user
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.delete);
  
    /**
     * @swagger
     * /api/users/:
     *  delete:
     *    description: Deletes all users
     *    responses: 
     *      '200':
     *         description: Succesfully deleted all users
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], users.deleteAll);
  
    /**
     * @swagger
     * /api/users/login:
     *  post:
     *    description: Executes login operation
     *    responses: 
     *      '200':
     *         description: Login occoured with success
     *      '403':
     *         description: Username/password incorrect or account banned
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/login", users.authenticate);

    /**
     * @swagger
     * /api/users/register:
     *  post:
     *    description: Executes registration operation
     *    responses: 
     *      '200':
     *         description: Registration was performed with success
     *      '400':
     *         description: Content cannot be empty
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/register", verifySignUp.checkDuplicateUsernameOrEmail, users.create);

    app.use('/api/users', router);
  };