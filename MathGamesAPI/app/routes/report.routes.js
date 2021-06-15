const { authJwt } = require("../middleware");

module.exports = app => {
    const reports = require("../controllers/report.controller.js");
    var router = require("express").Router();
  
    /**
     * @swagger
     * /api/reports/:
     *  post:
     *    description: Create a new report
     *    responses: 
     *      '200':
     *         description: Report was created with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.post("/", authJwt.verifyToken, reports.create);
  
    /**
     * @swagger
     * /api/reports/:
     *  get:
     *    description: Retrieve all reports
     *    responses: 
     *      '200':
     *         description: Retrieved all reports with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], reports.findAll);

    /**
     * @swagger
     * /api/reports/top:
     *  get:
     *    description: Retrieve top 10 users that have more reports
     *    responses: 
     *      '200':
     *         description: Retrieved top 10 users that have more reports
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/top", [authJwt.verifyToken, authJwt.isAdmin], reports.findUsersWithMostReports);

    /**
     * @swagger
     * /api/reports/:id:
     *  get:
     *    description: Retrieve report by report id
     *    responses: 
     *      '200':
     *         description: Retrieved required report with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], reports.findByReceiverId);
  
    /**
     * @swagger
     * /api/reports/:id:
     *  delete:
     *    description: Delete a report by a report id
     *    responses: 
     *      '200':
     *         description: Deleted required report with success
     *      '401':
     *         description: Unauthorized operation
     *      '403':
     *         description: No token provided
     *      '500':
     *         description: An internal error has occoured
     */
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], reports.delete);
  
    app.use('/api/reports', router);
  };