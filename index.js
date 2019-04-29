var express = require("express");
var app = express();
mongoose = require('mongoose');
var session = require('express-session');
var db = require('./server/config/db');
var article = require('./server/routes/article');
var multer = require('multer');
var passport = require('passport');
var jimp = require('jimp');
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
    var fullFileName = req.file.filename;
    var fileName = fullFileName.substr(0, fullFileName.indexOf('.'));
    var fileExtension = fullFileName.substr(fullFileName.indexOf('.') + 1)
    var response = JSON.stringify({
        "files":
            [
                {
                    "url": imgPath
                }
            ]
    })

    jimp.read(__dirname + imgPath)
    .then(img => {
      return img
        .resize(256, 144)
        .quality(30)
        .write('test/' + fileName + "_small." + fileExtension);
    })
    .catch(err => {
      console.error(err);
    });

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

app.get("/articles", function (req, res) {
    res.sendFile(__dirname + '/articles.html');
});

app.get("/my_article", function (req, res) {
    res.sendFile(__dirname + '/my_article.html');
});

app.get("/create", function (req, res) {
    res.sendFile(__dirname + '/create.html');
});

app.get("/search", function (req, res) {
    res.sendFile(__dirname + '/search.html');
});

app.post('/api/save/article', article.addArticle);
app.get('/api/get/article', article.getArticle);
app.get('/api/get/mainArticle', article.getMainArticle);
app.post('/api/get/allArticle', article.getAllArticle);
app.get('/api/get/articleById', article.getArticleById);
app.delete('/api/delete/articleById', article.deleteArticleById);
app.get('/api/search/article', article.searchArticle);

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