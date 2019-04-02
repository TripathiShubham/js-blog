var Schema   = mongoose.Schema;

var User = new Schema({
    name: String,
    firstName : String,
    lastName : String,
    profilePic : String,
    email: String,
    status: Boolean,
    creation_date: {type: Date, default: Date.now},
});
mongoose.model('user', User);