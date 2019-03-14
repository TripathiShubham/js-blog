var Schema   = mongoose.Schema;

var Article = new Schema({
    title: String,
    name : String,
    authorId : String,
    status: Boolean,
    content: String,
    read_time: Number,
    creation_date: {type: Date, default: Date.now},
});
mongoose.model('user', Article);