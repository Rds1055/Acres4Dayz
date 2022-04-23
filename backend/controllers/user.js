const jwt = require('jsonwebtoken');
const User = require('../models/user');
const connectToDatabase = require('../models/database-helpers.js');


const accessTokenSecret = 'rateababy';

const authenticateUser = async (username, password) => {
    const { DBQuery, disconnect } = await connectToDatabase();
    const u = new User(DBQuery, disconnect);
    const user = await u.authenticateUser(username, password);
    if (user === false) {
        return null;
    }
    const users = await u.findUserByUsername(username);
    const accessToken = jwt.sign({ ...users[0]}, accessTokenSecret);

    return accessToken;
}

module.exports = {
    authenticateUser
};