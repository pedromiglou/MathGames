module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
  
    // Create a new Comment
    app.post("/comments", comments.create);
  
    // Retrieve all comments
    app.get("/comments", comments.findAll);
  
    // Retrieve a single Comment with commentId
    app.get("/comments/:commentId", comments.findOne);
  
    // Update a Ban with userId
    app.put("/comments/:commentId", comments.update);
  
    // Delete a Ban with userId
    app.delete("/comments/:commentId", comments.delete);
  
    // Delete all comments
    app.delete("/comments", comments.deleteAll);
  };