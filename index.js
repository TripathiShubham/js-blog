var express = require("express");
var app = express();

app.use("/assets", express.static('assets'));

app.get("/karma_jasmine", function(req, res) {
    res.sendFile(__dirname + '/karma_jasmine.html');
});

app.get("/pwa", function(req, res) {
    res.sendFile(__dirname + '/pwa.html');
});

app.get("/chrome_developer_tool", function(req, res) {
    res.sendFile(__dirname + '/chrome_developer_tool.html');
});

app.get("/angular_app", function(req, res) {
    res.sendFile(__dirname + '/angular.html');
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function() {
    console.log("server started");
});