class land {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async updateLandDescription(id, description) {
        results = await this.DBQuery("UPDATE Land SET description = ? WHERE ID = ?", [description, id]);
        const newRecord = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return newRecord;
    }

    async updateIsAvailable(id, available) {
        results = await this.DBQuery("UPDATE Land SET is_available = ? WHERE ID = ?", [available, id]);
        const newRecord = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return newRecord;
    }

    async updateImage(id, image) {
        results = await this.DBQuery("UPDATE Land SET image = ? WHERE ID = ?", [image, id]);
        const newRecord = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return newRecord;
    }

    async getLand(query) {
        const id = query.id;
        const lat = query.lat;
        const long = query.long;
        const acres = query.acres;
        const owner = query.owner;
        const suitable = query.suitable;

        let results;
        if (id === undefined && (lat === undefined || long === undefined) && acres === undefined && owner === undefined && suitable === undefined) {
            results = await this.getAllLand();
        } else if (id === undefined && (lat === undefined || long === undefined) && acres === undefined && owner === undefined) {
            results = await this.getLandBySuitability(suitable);
        } else if (id === undefined && (lat === undefined || long === undefined) && acres === undefined && suitable === undefined) {
            results = await this.getLandByOwner(owner);
        } else if (id === undefined && (lat === undefined || long === undefined) && owner === undefined && suitable === undefined) {
            results = await this.getLandByAcres(acres);
        } else if (id === undefined && acres === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandByLocation(lat, long);
        } else if ((lat === undefined || long === undefined) && acres === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandById(id);
        } else if (id === undefined && (lat === undefined || long === undefined) && acres === undefined) {
            results = await this.getLandByOwnerSuitability(owner, suitability);
        } else if (id === undefined && (lat === undefined || long === undefined) && suitable === undefined) {
            results = await this.getLandByAcresOwner(acres, owner);
        } else if (id === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandByLocationAcres(lat, long, acres);
        } else if (acres === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandByIdLocation(id, lat, long);
        } else if (id === undefined && (lat === undefined || long === undefined) && owner === undefined) {
            results = await this.getLandByAcresSuitability(acres, suitable);
        } else if (id === undefined && acres === undefined && owner === undefined) {
            results = await this.getLandByLocationSuitability(lat, long, suitable);
        } else if ((lat === undefined || long === undefined) && acres === undefined && owner === undefined) {
            results = await this.getLandByIdSuitability(id, suitable);
        } else if (id === undefined && acres === undefined && suitable === undefined) {
            results = await this.getLandByLocationOwner(lat, long, owner);
        } else if ((lat === undefined || long === undefined) && acres === undefined && suitable === undefined) {
            results = await this.getLandByIdOwner(id, owner);
        } else if ((lat === undefined || long === undefined) && owner === undefined && suitable === undefined) {
            results = await this.getLandByIdAcres(id, acres);
        } else if (owner === undefined && suitable === undefined) {
            results = await this.getLandByIdLocationAcres(id, lat, long, acres);
        } else if (acres === undefined && suitable === undefined) {
            results = await this.getLandbyIdLocationOwner(id, lat, long, owner);
        } else if ((lat === undefined || long === undefined) && suitable === undefined) {
            results = await this.getLandByIdAcresOwner(id, acres, owner);
        } else if (id === undefined && suitable === undefined) {
            results = await this.getLandByLocationAcresOwner(lat, long, acres, owner);
        } else if (acres === undefined && owner === undefined) {
            results = await this.getLandByIdLocationSuitability(id, lat, long, suitable);
        } else if ((lat === undefined || long === undefined) && owner === undefined) {
            results = await this.getLandByIdAcresSuitability(id, acres, suitable);
        } else if (id === undefined && owner === undefined) {
            results = await this.getLandByLocationAcresSuitability(lat, long, acres, suitable);
        } else if ((lat === undefined || long === undefined) && acres === undefined) {
            results = await this.getLandByIdOwnerSuitability(id, owner, suitable);
        } else if (id === undefined && acres === undefined) {
            results = await this.getLandByLocationOwnerSuitability(lat, long, acres, suitable);
        } else if (id === undefined && (lat === undefined || long === undefined)) {
            results = await this.getLandByAcresOwnerSuitability(acres, owner, suitable); 
        } else if (id === undefined) {
            results = await this.getLandByLocationAcresOwnerSuitability(lat, long, acres, owner, suitable);
        } else if (lat === undefined || long === undefined) {
            results = await this.getLandByIdAcresOwnerSuitability(id, acres, owner, suitable);
        } else if (acres === undefined) {
            results = await this.getLandByIdLocationOwnerSuitability(id, lat, long, owner, suitable);
        } else if (owner === undefined) {
            results = await this.getLandByIdLocationAcresSuitability(id, lat, long, acres, suitable);
        } else if (suitable === undefined) {
            results = await this.getLandByIdLocationAcresOwner(id, lat, long, acres, suitable);
        } else {
            results = await this.getLandByAll(id, lat, long, acres, owner, suitable);
        }

        return results;
    }

    async getAllLand() {
        results = await this.DBQuery("SELECT * FROM Land");
        return results;
    }

    async getLandById(id) {
        results = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return results;
    }

    async getLandByLocation(lat, long) {

    }

    async getLandByAcres(acres) {
        results = await this.DBQuery("SELECT * FROM Land WHERE Acres > ?", [acres]);
        return results;
    }

    async getLandByOwner(owner) {
        results = await this.DBQuery("SELECT * FROM Land WHERE owner = ?", [owner]);
        return results;
    }

    async getLandBySuitability(suitable) {

    }

    async getLandByIdLocation(id, lat, long) {

    }

    async getLandByIdAcres(id, acres) {

    }

    async getLandByIdOwner(id, owner) {

    }

    async getLandByIdSuitability(id, suitable) {

    }

    async getLandByLocationAcres(lat, long, acres) {

    }

    async getLandByLocationOwner(lat, long, owner) {

    }

    async getLandByLocationSuitability(lat, long, suitable) {

    }

    async getLandByAcresOwner(acres, owner) {

    }

    async getLandByAcresSuitability(acres, suitable) {
        
    }

    async getLandByOwnerSuitability(acres, suitable) {

    }

    async getLandByIdLocationAcres(id, lat, long, acres) {

    }

    async getLandbyIdLocationOwner(id, lat, long, owner) {

    }

    async getLandByIdLocationSuitability(id, lat, long, suitable) {

    }

    async getLandByIdAcresOwner(id, acres, owner) {
        
    }

    async getLandByIdAcresSuitability(id, acres, suitability) {

    }

    async getLandByIdOwnerSuitability(id, owner, suitable) {

    }

    async getLandByLocationAcresOwner(lat, long, acres, owner) {

    }

    async getLandByLocationAcresSuitability(lat, long, acres, suitability) {

    }

    async getLandByLocationOwnerSuitability(lat, long, acres, suitability) {

    }

    async getLandByAcresOwnerSuitability(acres, owner, suitability) {

    }

    async getLandByIdLocationAcresOwner(id, lat, long, acres, owner) {

    }

    async getLandByIdLocationAcresSuitability(id, lat, long, acres, suitability) {

    }

    async getLandByIdLocationOwnerSuitability(id, lat, long, owner, suitable) {

    }

    async getLandByIdAcresOwnerSuitability(id, acres, owner, suitability) {

    }

    async getLandByLocationAcresOwnerSuitability(lat, long, acres, owner, suitable) {

    }

    async getLandByAll(id, lat, long, acres, owner, suitable) {

    }
}

module.exports = land;