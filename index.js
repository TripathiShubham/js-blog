var express = require("express");
var app = express();

app.use("/assets", express.static('assets'));

app.get("/blog", function(req, res) {
    res.sendFile(__dirname + '/blog.html');
});

app.get("/pwa", function(req, res) {
    res.sendFile(__dirname + '/blog1.html');
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function() {
    console.log("server started");
});