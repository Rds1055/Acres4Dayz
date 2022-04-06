class land {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async fetchAllSpaces() {
        const results = await this.DBQuery("SELECT * FROM Bid");
        return results;
    }

    async updateLandDescription(id, description) {
        
    }

    async updateIsAvailable(id, available) {

    }

    async updateImage(id, image) {

    }

    async getLandByLocation(lat, long) {

    }

    async getLandByAcres(acres) {

    }

    async getLandByOwner(owner) {

    }

    async getLandBySuitability(suitable) {

    }
}

module.exports = land;