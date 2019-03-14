require('../models/article');

var Article = mongoose.model('article');

module.exports = {
    // Add Article
    addArticle: function (req, res) {
        var article = new Article({
            title: req.body.title,
            authorId : req.body.authorId,
            status: 'Active',
            content: req.body.content,
            read_time: req.body.rtime,
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
        Article.find({title: req.query.title}, function(err, result) {
            console.log(result);
            res.send(result);
        });
    }
}