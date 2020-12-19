const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
        name: {
            type: String,
            trim: true,
            minlength: [3, "Name can't be shorter than 3 characters"],
            maxlength: [20, "Name can't be longer than 20 characters"],
            required: true
        },
        email: {
            type: String,
            require: [true, 'Enter an email address.'],
            unique: [true, 'That email address is taken.'],
            lowercase: true,
            validate: [validator.isEmail, 'Enter a valid email address.']
        },
        password: {
            type: String,
            required: [true, 'Enter a password.'],
            minLength: [6, 'Password should be at least 6 characters']
        },
        passwordConfirm: {
            type: String,
            required: [true, 'Retype your password.'],
            validate: {
                validator: function (el) {
                    return el === this.password;
                }, message: 'Passwords don\'t match.'
            }
        }


    }
);

//schema middleware to apply before saving
UserSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});


const User = mongoose.model("users", UserSchema);
module.exports = User;


// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const validator = require('validator');
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: [true, 'Enter a username.'],
//         unique: [true, 'That username is taken.'],
//         lowercase: true,
//         validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
//     },
//     email: {
//         type: String,
//         require: [true, 'Enter an email address.'],
//         unique: [true, 'That email address is taken.'],
//         lowercase: true,
//         validate: [validator.isEmail, 'Enter a valid email address.']
//     },
//     password: {
//         type: String,
//         required: [true, 'Enter a password.'],
//         minLength: [4, 'Password should be at least four characters']
//     },
//     passwordConfirm: {
//         type: String,
//         required: [true, 'Retype your password.'],
//         validate: {
//             validator: function(el) {
//                 return el === this.password;
//             }, message: 'Passwords don\'t match.'
//         }
//     }
// });
// //schema middleware to apply before saving
// userSchema.pre('save', async function(next) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.passwordConfirm = undefined;
//     next();
// });
// const User = mongoose.model('User', userSchema);
// module.exports = User;
