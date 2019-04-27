const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    email: {
        type: String,
        require: true,
        minlength: 1, 
        unique: true
    }, 
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    isUserAdmin: {
        type: Boolean,
        required: true
    }
})

UserSchema.pre('save', function(next) {
    const user = this;

    // checks to ensure we don't hash password more than once
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, null, (err, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

UserSchema.statics.findByUsername = function(username) {
    console.log("findByUsername");
    
    const User = this

    return User.findOne({ username: username }).then((user) => {
        if (!user) {
            return Promise.reject()
        }

        return Promise.resolve(user)
    })
}

UserSchema.statics.authenticateEmail = function(email, password) {
    const User = this

    return User.findOne({ email: email }).then((user) => {
        if (!user) {
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

UserSchema.statics.authenticateUsername = function(username, password) {
    const User = this

    return User.findOne({ username: username }).then((user) => {
        if (!user) {
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}

UserSchema.statics.authenticateId = function(id, password) {
    const User = this

    return User.findOne({ _id:id }).then((user) => {
        if (!user) {
            return Promise.reject()
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user)
                } else {
                    reject()
                }
            })
        })
    })
}


UserSchema.plugin(uniqueValidator)

const User = mongoose.model('User', UserSchema)

module.exports = { User }