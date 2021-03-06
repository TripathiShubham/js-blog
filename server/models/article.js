var Schema   = mongoose.Schema;

var Article = new Schema({
    title: String,
    name : String,
    authorId : String,
    authorName : String,
    status: Boolean,
    authorImgUrl: String,
    content: String,
    readTime: Number,
    viewContent: String,
    articleImage: String,
    tags: [String],
    creation_date: {type: Date, default: Date.now},
});
mongoose.model('article', Article);