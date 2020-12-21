const jwt = require('jsonwebtoken');
const responseFormat = require('../helper/responseFormat');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            // console.log(err);
            return res.send(responseFormat(false, [], "Access denied. Security token not valid."));
        }
        req.user = user;
        next()
    })
};

const createUserToken = (id) => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 36000
    });
};

module.exports = {
    authenticateToken,
    createUserToken
};
