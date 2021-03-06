const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

// Create jwt token for user
function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function(req, res, next){

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({error: 'You must provide email and password'});
    }

    User.findOne({ email }, (err, existingUser) => {
        if(err){
            return next(err);
        }

        if(existingUser){
            return res.status(422).send({ error: "Email is already in use" });
        }

        const user = new User({ email, password });
        user.save((err) => {
            if(err){
                return next(err);
            }
            // Respond with user's token after siging up
            res.json({token: tokenForUser(user)});
        });
    });

}

exports.signin = function(req, res, next) {
    res.send({ token: tokenForUser(req.user) });
}
