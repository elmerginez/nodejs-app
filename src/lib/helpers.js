const bcrypt = require('bcryptjs');
const passport = require('passport');


const helpers = {};

helpers.encriptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.comparePassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (error) {
        console.log(error)
    }
};

module.exports = helpers;