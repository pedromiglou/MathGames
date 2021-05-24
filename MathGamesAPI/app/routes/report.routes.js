const { authJwt } = require("../middleware");

module.exports = app => {
    const reports = require("../controllers/report.controller.js");
    var router = require("express").Router();
  
    // Create a new Report
    router.post("/", authJwt.verifyToken, reports.create);
  
    // Retrieve all reports
    router.get("/", reports.findAll);

    // Retrieve all reports received by a userid
    router.get("/:id", reports.findByUserId);
  
    // Delete a Report with id
    router.delete("/:id", reports.delete);
  
    app.use('/api/reports', router);
  };