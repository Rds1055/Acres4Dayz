knex = require("../db/knex");
const bcrypt = require("bcrypt");

const USER_TABLE = "User";

class user {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async createNewUser(username, password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const results = await this.DBQuery("INSERT INTO User(username, password) VALUES (?, ?)", [username, hashedPassword]);
        const newRecord = await this.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
        // const query = knex(USER_TABLE).insert({username, password: hashedPassword});
        // const result = await query;

        return newRecord;
    };

    async findUserByUsername(username) {
        // const query = knex(USER_TABLE).where({username});
        // const result = await query;
        // return result;
        const results = await history.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
        return results;
    };

    async authenticateUser(username, password) {
        const users = await findUserByUsername(username);
        if (users.length === 0) {
            console.error(`No users matched the username ${username}`);
            return false;
        }
        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        return validPassword;
    };

    async updateUserEmail(username, email) {
        const results = await this.DBQuery("UPDATE User SET email = ? WHERE username = ?", [email, username]);
        const newRecord = await this.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
        return newRecord;
    };

    async updateUserPhone(username, phone) {
        const results = await this.DBQuery("UPDATE User SET phone = ? WHERE username = ?", [phone, username]);
        const newRecord = await this.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
        return newRecord;
    };

    async updateUserImage(username, image) {
        const results = await this.DBQuery("UPDATE User SET image = ? WHERE username = ?", [image, username]);
        const newRecord = await this.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
        return newRecord;
    };
}

// module.exports = {
//     createNewUser,
//     findUserByUsername,
//     authenticateUser,
//     updateUserEmail,
//     updateUserPhone,
//     updateUserImage
// };
module.exports = user;