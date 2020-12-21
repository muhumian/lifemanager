const router = require('express').Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const auth = require('../../helper/token');
const User = require('../../models/account/user');
const responseFormat = require('../../helper/responseFormat');

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
        .catch((err) => {
            console.log(err);

            if (err.name === 'ValidationError') {
                res.send(responseFormat(false, null, err.errors[Object.keys(err.errors)[0]].properties.message));
            } else if (err.code && err.code === 11000) {
                res.send(responseFormat(false, null, "Email already in use"));
            }
        });
});

router.post('/user/login', (req, res) => {

    if (!validator.isEmail(req.body.email)) {
        res.send(responseFormat(false, null, "Invalid email"));
    } else if (req.body.password.length < 6 || req.body.password.length > 20) {
        res.send(responseFormat(false, null, "Invalid email"));
    } else {

        User.findOne({email: req.body.email})
            .then(user => {
                if (Object.keys(user).length > 0) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        if (result) {
                            res.send(responseFormat(true, {
                                name: user.name,
                                email: user.email,
                                id: user._id,
                                token: auth.createUserToken(user._id)
                            }, null));
                        } else {
                            res.send(responseFormat(false, null, "Email or password isn't correct"));
                        }
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.send(responseFormat(false, null, "Request failed"));
            });
    }
});

module.exports = router;
