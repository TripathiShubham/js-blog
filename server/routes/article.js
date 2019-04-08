require('../models/article');

var Article = mongoose.model('article');

module.exports = {
    // Add Article
    addArticle: function (req, res) {
        if (req.session.user == undefined) {
            res.redirect('/');
            return;
        }
        var article = new Article({
            title: req.body.title,
            authorId: req.session.user.profile._id,
            authorName: req.session.user.profile.firstName,
            authorImgUrl: req.session.user.profile.profilePic,
            status: req.body.status,
            content: req.body.content,
            viewContent: req.body.viewContent,
            readTime: req.body.readTime,
            articleImage: req.body.articleImage,
            tags: req.body.tags
        });
        article.save(function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send('Error Occured while saving user');
            } else {
                res.status(200).send({ "result": result });
            }
        });
    },
    getArticle: function (req, res) {
        Article.find({ _id: req.query.id }, function (err, result) {
            res.send(result);
        });
    },
    getMainArticle: function (req, res) {
        Article.find({ articleImage: { $ne: null } })
            .limit(5)
            .exec(function (err, result) {
                res.send(result);
            })
    },
    getAllArticle: function (req, res) {
        Article.find({})
            .sort('-creation_date')
            .limit(parseInt(req.query.offset))
            .skip(parseInt(req.query.skip))
            .exec(function (err, result) {
                res.send(result);
            })
    },
    getArticleById: function (req, res) {
        Article.find({ authorId: req.session.user.profile._id })
            .sort('-creation_date')
            .exec(function (err, result) {
                res.send(result);
            })
    },
    deleteArticleById: function (req, res) {
        Article.findOneAndDelete({ _id: req.body.id }, function (err, result) {
            res.send({ "status": "OK" });
        })
    },
    searchArticle: function (req, res) {
        var query = {}
        var query = {
            $or:
                [{ "title": { $regex: req.query.search + '.*', $options: 'i' } },
                { "tags": { $regex: req.query.search + '.*', $options: 'i' } }]
        }

        Article.find(query, function (err, result) {
            res.send(result);
        });
    }
}