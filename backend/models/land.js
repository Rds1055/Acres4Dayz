class land {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async getAllLand() {
        const results = await this.DBQuery("SELECT * FROM Land");
        return results;
    }

    async updateLandDescription(id, description) {
        const results = await this.DBQuery("UPDATE Land SET description = ? WHERE ID = ?", [description, id]);
        const newRecord = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return newRecord;
    }

    async updateIsAvailable(id, available) {
        const results = await this.DBQuery("UPDATE Land SET is_available = ? WHERE ID = ?", [available, id]);
        const newRecord = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return newRecord;
    }

    async updateImage(id, image) {
        const results = await this.DBQuery("UPDATE Land SET image = ? WHERE ID = ?", [image, id]);
        const newRecord = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return newRecord;
    }

    async getLandById(id) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return results;
    }

    async getLandByLocation(lat, long) {

    }

    async getLandByAcres(acres) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE Acres > ?", [acres]);
        return results;
    }

    async getLandByOwner(owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE owner = ?", [owner]);
        return results;
    }

    async getLandBySuitability(suitable) {

    }
}

module.exports = land;