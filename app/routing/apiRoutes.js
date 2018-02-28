// Require the friends file
var friends = require("../data/friends.js");
var path = require("path");

// Routing
module.exports = function (app) {
    // API GET request 
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    // API POST Request
    app.post("/api/friends", function (req, res) {
      friends.push(req.body);
      res.json(friends);
    });
};