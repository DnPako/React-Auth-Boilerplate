const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local strategy
const localOptions = {usernameField: 'email'};
const localStrategy = new LocalStrategy(localOptions, (email, password, done) => {
    // Verify email and password then call done with user if it exists
    User.findOne({ email }, (err, user) => {
        if(err) { return done(err); }
        if(!user) { return done(null, false); }
        // Compare passwords
        user.comparePassword(password, (err, isMatch) => {
            if(err) { return done(err); }
            if(!isMatch) { return done(null, false); }
            return done(null, user);
        });
    });
});

// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // Check if the is user id in the payload exist in the db then call done
    User.findById(payload.sub, (err, user) => {
        if(err) { return done(err, false); }
        user ? done(null, user) : done(null, false);
    });
});

// Tell passport to use strategies
passport.use(jwtLogin);
passport.use(localStrategy);
