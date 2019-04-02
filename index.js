var express = require("express");
var app = express();
mongoose = require('mongoose');
var session = require('express-session');
var db = require('./server/config/db');
var article = require('./server/routes/article');
var user = require('./server/routes/user');
var multer = require('multer');
var passport = require('passport');
var auth = require('./server/config/auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'test')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    var imgPath = "/test/" + req.file.filename;
    var response = JSON.stringify({
        "files":
            [
                {
                    "url": imgPath
                }
            ]
    })
    res.send(JSON.parse(response));
});

app.use("/assets", express.static('assets'));
app.use("/test", express.static('test'));
app.use("/bower_components", express.static('bower_components'));

auth(passport);
app.use(passport.initialize());

app.get('/auth/login', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
}));
app.get('/auth/google',
    passport.authenticate('google', {
        failureRedirect: '/'
    }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

app.get("/article", function (req, res) {
    res.sendFile(__dirname + '/article.html');
});

app.get("/create", function (req, res) {
    res.sendFile(__dirname + '/create.html');
});

app.post('/api/save/article', article.addArticle);
app.get('/api/get/article', article.getArticle);
app.get('/api/get/allArticle', article.getAllArticle);

app.get('/api/get/user', function (req, res) {
    res.send(req.session.user);
})

app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.use(passport.session());

app.get("*", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 3000, function () {
    console.log("server started");
});