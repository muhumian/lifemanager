const router = require('express').Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const auth = require('../../helper/token');
const User = require('../../models/account/user');

router.post('/user/add', (req, res) => {

    const newUser = new User(req.body);

    newUser.save()
        .then(r => {

            if (Object.keys(r).length > 0) {
                res.json({
                    result: true, user: {
                        name: r.name,
                        email: r.email,
                        id: r._id,
                        token: auth.createUserToken(r._id)
                    }
                });
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.json({result: false, errorMessage: err.errors[Object.keys(err.errors)[0]].properties.message});
            } else if (err.code && err.code === 11000) {
                res.json({result: false, errorMessage: "Email already in use"});
            }
        });
});

router.post('/user/login', (req, res) => {

    if (!validator.isEmail(req.body.email)) {
        res.json({result: false, errorMessage: "Invalid email"});
    } else if (req.body.password.length < 6 || req.body.password.length > 20) {
        res.json({
            result: false,
            errorMessage: "Password can't be shorter than 6 characters and longer than 20 characters"
        });
    } else {

        User.findOne({email: req.body.email})
            .then(user => {

                if (Object.keys(user).length > 0) {
                    // console.log(user);

                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (result) {
                            res.json({
                                result: true, user: {
                                    name: user.name,
                                    email: user.email,
                                    id: user._id,
                                    token: auth.createUserToken(user._id)
                                }
                            })
                        } else {
                            res.json({result: false, errorMessage: "Email or password isn't correct"})
                        }
                    });
                }
            }).catch(err => res.json({result: false, errorMessage: err.message}));
    }
});

module.exports = router;
