// Require the friends file
var friends = require("../data/friends.js");
var path = require("path");

// Routing
module.exports = function (app) {
    // API GET Request for json data of all users
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    // API POST Request of user data
    app.post("/api/friends", function (req, res) {
        
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };
        // Take the result of the user's survey POST and parse it
        var userData = req.body;
        var userScores = userData.scores;
        // To calculate the difference between the user's scores and the scores of each user in database
        var totalDifference = 0;
        // Loop through all users in database
        for (var i = 0; i < friends.length; i++) {
            totalDifference = 0;
            // Loop through the scores of all users
            for(var j = 0; j < friends[i].scores[j]; j++) {
                // Calculate the difference between scores and add them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // Check if the sum is less than the differences of current best match
                if(totalDifference <= bestMatch.friendDifference) {
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        friends.push(userData);
        res.json(bestMatch);
    });
}










