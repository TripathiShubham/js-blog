require('../models/article');

var Article = mongoose.model('article');

module.exports = {
    // Add Article
    addArticle: function (req, res) {
        var article = new Article({
            title: req.body.title,
            authorId : req.body.authorId,
            authorName : req.body.authorName,
            status: true,
            content: req.body.content,
            viewContent: req.body.viewContent,
            readTime: req.body.readTime,
            articleImage: req.body.articleImage
        });
        article.save(function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).send('Error Occured while saving user');
            } else {
                res.status(200).send({"result": result});
            }
        });
    },
    getArticle: function(req, res) {
        Article.find({_id: req.query.id}, function(err, result) {
            console.log(err);
            res.send(result);
        });
    },
    getAllArticle: function(req, res) {
        Article.find({})
        //.sort('-creation_date')
        .limit(5)
        .exec(function(err, result){
            res.send(result);
        })
    }
}