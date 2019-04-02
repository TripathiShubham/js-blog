require('../models/user');

var User = mongoose.model('user');

module.exports = {
    addUser: function (userDetails, callback) {
        var user = new User({
            name: userDetails.name,
            firstName : userDetails.given_name,
            lastName : userDetails.family_name,
            profilePic : userDetails.picture,
            email: userDetails.email,
            status: true
        });
        user.save(function(err, result) {
            if(err) {
                console.log(err);
                callback(null);
            } else {
                callback(result);
            }
        });
    },
    getUserByEmail: function(email, callback) {
        User.findOne({email: email}, function(err, result) {
            if(err) {
                console.log(err);
                callback(null);
            } else {
                callback(result);
            }
        });
    }
}