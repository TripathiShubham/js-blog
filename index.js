var express = require("express");
var app = express();
mongoose = require('mongoose');
//var db = require('./server/config/db');
var article = require('./server/routes/article');
var multer = require('multer');

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'test')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage});

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    var imgPath = "/test/" + req.file.filename;
    var response = JSON.stringify({
        "files":
            [
                {
                    "url": imgPath
                }
            ]
    })
    console.log(response);
    res.send(JSON.parse(response));
});

app.use("/assets", express.static('assets'));
app.use("/test", express.static('test'));
app.use("/bower_components", express.static('bower_components'));

app.get("/karma_jasmine", function (req, res) {
    res.sendFile(__dirname + '/karma_jasmine.html');
});

app.get("/pwa", function (req, res) {
    res.sendFile(__dirname + '/pwa.html');
});

app.get("/chrome_developer_tool", function (req, res) {
    res.sendFile(__dirname + '/chrome_developer_tool.html');
});

app.get("/angular_app", function (req, res) {
    res.sendFile(__dirname + '/angular.html');
});

app.get("/editor", function (req, res) {
    res.sendFile(__dirname + '/editor.html');
});

app.get("/create", function (req, res) {
    res.sendFile(__dirname + '/create.html');
});

app.post('/api/save/article', article.addArticle);
app.get('/api/get/article', article.getArticle);

/*app.post('/upload', function (req, res) {
    var response = JSON.stringify({
        "files":
            [
                {
                    "url": "/test/" + req.file.filename
                }
            ]
    })
    res.send(JSON.parse(response));
});*/

app.get("*", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log("server started");
});