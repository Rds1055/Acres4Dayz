knex = require("../db/knex");
const bcrypt = require("bcrypt");

const USER_TABLE = "User";

const createNewUser = async (body) => {
    const username = body.username;
    const password = body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = knex(USER_TABLE).insert({username, password: hashedPassword});
    const result = await query;
    return result
};

const findUserByUsername = async (username) => {
    const query = knex(USER_TABLE).where({username});
    const result = await query;
    return result;
};

const authenticateUser = async (username, password) => {
    const users = await findUserByUsername(username);
    if (users.length === 0) {
        console.error(`No users matched the username ${username}`);
        return false;
    }
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    return validPassword;
};

const updateUserEmail = async (username, email) => {
    const results = await this.DBQuery("UPDATE User SET email = ? WHERE username = ?", [email, username]);
    const newRecord = await this.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
    return newRecord;
};

const updateUserPhone = async (username, phone) => {
    const results = await this.DBQuery("UPDATE User SET phone = ? WHERE username = ?", [phone, username]);
    const newRecord = await this.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
    return newRecord;
};

const updateUserImage = async (username, image) => {
    const results = await this.DBQuery("UPDATE User SET image = ? WHERE username = ?", [image, username]);
    const newRecord = await this.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
    return newRecord;
};

module.exports = {
    createNewUser,
    findUserByUsername,
    authenticateUser,
    updateUserEmail,
    updateUserPhone,
    updateUserImage
};