var Schema   = mongoose.Schema;

var Article = new Schema({
    title: String,
    name : String,
    authorId : String,
    status: Boolean,
    content: String,
    readTime: Number,
    viewContent: String,
    articleImage: String,
    creation_date: {type: Date, default: Date.now},
});
mongoose.model('article', Article);