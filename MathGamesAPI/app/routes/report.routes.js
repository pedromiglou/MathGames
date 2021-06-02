const { authJwt } = require("../middleware");

module.exports = app => {
    const reports = require("../controllers/report.controller.js");
    var router = require("express").Router();
  
    // Create a new Report
    router.post("/", authJwt.verifyToken, reports.create);
  
    // Retrieve all reports
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], reports.findAll);

    // Retrieve top 10 users with most reports
    router.get("/top", [authJwt.verifyToken, authJwt.isAdmin], reports.findUsersWithMostReports);

    // Retrieve all reports received by a userid
    router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], reports.findByReceiverId);
  
    // Delete a Report with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], reports.delete);
  
    app.use('/api/reports', router);
  };