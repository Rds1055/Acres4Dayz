class land {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async createNewLand(body) {
        const id = body.ID;
        const acres = body.acres;
        const owner = body.owner;
        const description = body.description;
        const lat = body.coord_lat;
        const long = body.coord_long;
        const suitable = body.suitable_for;
        const bid = body.starting_bid;
        const image = body.image;

        let result;
        if (id === undefined) {
            result = await this.DBQuery("INSERT INTO Land(acres, owner, description, coord_lat, coord_long, suitable_for, starting_bid, image) VALUES (?,?,?,?,?,?,?,?)", [acres, owner, description, lat, long, suitable, bid, image]);
        } else {
            result = await this.DBQuery("INSERT INTO Land(ID, acres, owner, description, coord_lat, coord_long, suitable_for, starting_bid, image) VALUES (?,?,?,?,?,?,?,?,?)", [id, acres, owner, description, lat, long, suitable, bid, image]);
        }
        
        const newRecord = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [result.insertId]);
        return newRecord;
    }

    async deleteLand(id) {
        const result = this.DBQuery("DELETE FROM Land WHERE ID = ?", [id]);
        return result;
    }

    async updateLand(id, body) {
        const description = body.description;
        const image = body.image;

        if (description !== undefined) {
            this.updateDescription(id, description);
        }
        if (image !== undefined) {
            this.updateImage(id, image);
        }

        const newRecord = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return newRecord;
    }

    async updateDescription(id, description) {
        const results = await this.DBQuery("UPDATE Land SET description = ? WHERE ID = ?", [description, id]);
    }

    async updateImage(id, image) {
        const results = await this.DBQuery("UPDATE Land SET image = ? WHERE ID = ?", [image, id]);
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
            results = await this.getLandByOwnerSuitability(owner, suitable);
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
        const results = await this.DBQuery("SELECT * FROM Land");
        return results;
    }

    async getLandById(id) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ?", [id]);
        return results;
    }

    async getLandByLocation(lat, long) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE lat = ? AND long = ?", [lat, long]);
        return results;
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
        const results = await this.DBQuery("SELECT * FROM Land WHERE suitability = ?", [suitable]);
        return results;
    }

    async getLandByIdLocation(id, lat, long) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND lat = ? AND long = ?", [id, lat, long]);
        return results;
    }

    async getLandByIdAcres(id, acres) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND acres = ?", [id, acres]);
        return results;
    }

    async getLandByIdOwner(id, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND owner = ?", [id, owner]);
        return results;
    }

    async getLandByIdSuitability(id, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND suitability = ?", [id, suitable]);
        return results;
    }

    async getLandByLocationAcres(lat, long, acres) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE lat = ? AND long = ? AND acres = ?", [lat, long, acres]);
        return results;
    }

    async getLandByLocationOwner(lat, long, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE lat = ? AND long = ? AND owner = ?", [lat, long, owner]);
        return results;
    }

    async getLandByLocationSuitability(lat, long, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE lat = ? AND long = ? AND suitability = ?", [lat, long, suitable]);
        return results;
    }

    async getLandByAcresOwner(acres, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE acres = ? AND owner = ?", [acres, owner]);
        return results;
    }

    async getLandByAcresSuitability(acres, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE acres = ? AND suitability = ?", [acres, suitable]);
        return results;
    }

    async getLandByOwnerSuitability(owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE owner = ? AND suitability = ?", [owner, suitable]);
        return results;
    }

    async getLandByIdLocationAcres(id, lat, long, acres) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND lat = ? AND long = ? AND acres = ?", [id, lat, long, acres]);
        return results;
    }

    async getLandbyIdLocationOwner(id, lat, long, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND lat = ? AND long = ? AND owner = ?", [id, lat, long, owner]);
        return results;
    }

    async getLandByIdLocationSuitability(id, lat, long, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND lat = ? AND long = ? AND suitability = ?", [id, lat, long, suitable]);
        return results;
    }

    async getLandByIdAcresOwner(id, acres, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND acres = ? AND owner = ?", [id, acres, owner]);
        return results;
    }

    async getLandByIdAcresSuitability(id, acres, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND acres = ? AND suitability = ?", [id, acres, suitable]);
        return results;
    }

    async getLandByIdOwnerSuitability(id, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND owner = ? AND suitability = ?", [id, owner, suitable]);
        return results;
    }

    async getLandByLocationAcresOwner(lat, long, acres, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE lat = ? AND long = ? AND acres = ? AND owner = ?", [lat, long, acres, owner]);
        return results;
    }

    async getLandByLocationAcresSuitability(lat, long, acres, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE lat = ? AND long = ? AND acres = ? AND suitability = ?", [lat, long, acres, suitable]);
        return results;
    }

    async getLandByLocationOwnerSuitability(lat, long, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE lat = ? AND long = ? AND owner = ? AND suitability = ?", [lat, long, owner, suitable]);
        return results;
    }

    async getLandByAcresOwnerSuitability(acres, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE acres = ? AND owner = ? AND suitability = ?", [acres, owner, suitable]);
        return results;
    }

    async getLandByIdLocationAcresOwner(id, lat, long, acres, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND lat = ? AND long = ? AND acres = ? AND owner = ?", [id, lat, long, acres, owner]);
        return results;
    }

    async getLandByIdLocationAcresSuitability(id, lat, long, acres, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND lat = ? AND long = ? AND acres = ? AND suitability = ?", [id, lat, long, acres, suitable]);
        return results;
    }

    async getLandByIdLocationOwnerSuitability(id, lat, long, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND lat = ? AND long = ? AND owner = ? AND suitability = ?", [id, lat, long, owner, suitable]);
        return results;
    }

    async getLandByIdAcresOwnerSuitability(id, acres, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND acres = ? AND owner = ? AND suitability = ?", [id, acres, owner, suitable]);
        return results;
    }

    async getLandByLocationAcresOwnerSuitability(lat, long, acres, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE lat = ? AND long = ? AND acres = ? AND owner = ? AND suitable = ?", [lat, long, acres, owner, suitable]);
        return results;
    }

    async getLandByAll(id, lat, long, acres, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND lat = ? AND long = ? AND acres = ? AND owner = ? AND suitability = ?", [id, lat, long, acres, owner, suitable]);
        return results;
    }
}

module.exports = land;