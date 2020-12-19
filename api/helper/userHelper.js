const User = require('../models/account/user');

//this functions save us from crud tasks if user have been deleted account but we still have an token
const isThereUser = async (id) => {
    const user = await User.findOne({_id: id})
        .then((user) => {
            return user;
        })
        .catch(() => {
            return false;
        });

    return Object.keys(user).length > 0;
};

module.exports = {isThereUser};
