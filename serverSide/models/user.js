const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Create user schema
const userSchema = new Schema({
    email: {type: String, unique: true, lowercase: true},
    password: String
});

// Hash password before save
userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.genSalt(10, (err, salt) => {
        if(err){ return next(err); }

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if(err){ return next(err); }

            user.password = hash;
            next();
        });
    });
});

// Add method comparePassword
userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err) { return callback(err); }
        return callback(null, isMatch);
    });
}

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
