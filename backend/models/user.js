const bcrypt = require("bcrypt");

class User {
    // Constructor
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    // Disconnect from the database
    close () {
        this.disconnect();
    }

    async createNewUser(body) {
        const username = body.username;
        const password = body.password;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = await this.DBQuery("INSERT INTO User(username, password) VALUES (?, ?)", [username, hashedPassword]);
        delete body.password;
        this.updateUserData(username, body);
        return this.findUserByUsername(username);
    };

    async getAllUsers() {
        const result = await this.DBQuery("SELECT * FROM User");
        return result;
    }
    
    async findUserByUsername(username) {
        const result = await this.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
        return result;
    };
    
    async authenticateUser(username, password) {
        const users = await this.findUserByUsername(username);
        if (users.length === 0) {
            console.error(`No users matched the username ${username}`);
            return false;
        }
        const user = users[0];
        const validPassword = await bcrypt.compare(password, user.password);
        return validPassword;
    };
    
    async updateUserData(username, body) {
        const password = body.password;
        const email = body.email;
        const phone = body.phone;
        if (password !== undefined) {
            this.updateUserPassword(username, password);
        }
        if (email !== undefined) {
            this.updateUserEmail(username, email);
        }
        if (phone !== undefined) {
            this.updateUserPhone(username, phone);
        }
        const newRecord = await this.DBQuery("SELECT * FROM User WHERE username = ?", [username]);
        return newRecord;
    }
    
    async updateUserPassword(username, password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = await this.DBQuery("UPDATE User SET password = ? WHERE username = ?", [hashedPassword, username]);
    }
    
    async updateUserEmail(username, email) {
        const results = await this.DBQuery("UPDATE User SET email = ? WHERE username = ?", [email, username]);
    };
    
    async updateUserPhone(username, phone) {
        const results = await this.DBQuery("UPDATE User SET phone = ? WHERE username = ?", [phone, username]);
    };
}

module.exports = User;