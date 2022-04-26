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
        const zip = body.zip_code;
        const suitable = body.suitable_for;
        const bid = body.starting_bid;
        const image = body.image;

        let result;
        if (id === undefined) {
            result = await this.DBQuery("INSERT INTO Land(acres, owner, description, zip_code, suitable_for, starting_bid, image) VALUES (?,?,?,?,?,?,?,?)", [acres, owner, description, zip, suitable, bid, image]);
        } else {
            result = await this.DBQuery("INSERT INTO Land(ID, acres, owner, description, zip_code, suitable_for, starting_bid, image) VALUES (?,?,?,?,?,?,?,?,?)", [id, acres, owner, description, zip, suitable, bid, image]);
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
        const bid = body.starting_bid;

        if (description !== undefined) {
            this.updateDescription(id, description);
        }
        if (image !== undefined) {
            this.updateImage(id, image);
        }
        if (bid !== undefined) {
            this.updateBid(id, bid);
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

    async updateBid(id, bid) {
        const results = await this.DBQuery("UPDATE Land SET starting_bid = ? WHERE ID = ?", [bid, id]);
    }

    async getLand(query) {
        const id = query.id;
        const zip = query.zip_code;
        const acres = query.acres;
        const owner = query.owner;
        const suitable = query.suitable;

        let results;
        if (id === undefined && zip === undefined && acres === undefined && owner === undefined && suitable === undefined) {
            results = await this.getAllLand();
        } else if (id === undefined && zip === undefined && acres === undefined && owner === undefined) {
            results = await this.getLandBySuitability(suitable);
        } else if (id === undefined && zip === undefined && acres === undefined && suitable === undefined) {
            results = await this.getLandByOwner(owner);
        } else if (id === undefined && zip === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandByAcres(acres);
        } else if (id === undefined && acres === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandByLocation(zip);
        } else if (zip === undefined && acres === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandById(id);
        } else if (id === undefined && zip === undefined && acres === undefined) {
            results = await this.getLandByOwnerSuitability(owner, suitable);
        } else if (id === undefined && zip === undefined && suitable === undefined) {
            results = await this.getLandByAcresOwner(acres, owner);
        } else if (id === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandByLocationAcres(zip, acres);
        } else if (acres === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandByIdLocation(id, zip);
        } else if (id === undefined && zip === undefined && owner === undefined) {
            results = await this.getLandByAcresSuitability(acres, suitable);
        } else if (id === undefined && acres === undefined && owner === undefined) {
            results = await this.getLandByLocationSuitability(zip, suitable);
        } else if (zip === undefined && acres === undefined && owner === undefined) {
            results = await this.getLandByIdSuitability(id, suitable);
        } else if (id === undefined && acres === undefined && suitable === undefined) {
            results = await this.getLandByLocationOwner(zip, owner);
        } else if (zip === undefined && acres === undefined && suitable === undefined) {
            results = await this.getLandByIdOwner(id, owner);
        } else if (zip === undefined && owner === undefined && suitable === undefined) {
            results = await this.getLandByIdAcres(id, acres);
        } else if (owner === undefined && suitable === undefined) {
            results = await this.getLandByIdLocationAcres(id, zip, acres);
        } else if (acres === undefined && suitable === undefined) {
            results = await this.getLandbyIdLocationOwner(id, zip, owner);
        } else if (zip === undefined && suitable === undefined) {
            results = await this.getLandByIdAcresOwner(id, acres, owner);
        } else if (id === undefined && suitable === undefined) {
            results = await this.getLandByLocationAcresOwner(zip, acres, owner);
        } else if (acres === undefined && owner === undefined) {
            results = await this.getLandByIdLocationSuitability(id, zip, suitable);
        } else if (zip === undefined && owner === undefined) {
            results = await this.getLandByIdAcresSuitability(id, acres, suitable);
        } else if (id === undefined && owner === undefined) {
            results = await this.getLandByLocationAcresSuitability(zip, acres, suitable);
        } else if (zip === undefined && acres === undefined) {
            results = await this.getLandByIdOwnerSuitability(id, owner, suitable);
        } else if (id === undefined && acres === undefined) {
            results = await this.getLandByLocationOwnerSuitability(zip, acres, suitable);
        } else if (id === undefined && zip === undefined) {
            results = await this.getLandByAcresOwnerSuitability(acres, owner, suitable); 
        } else if (id === undefined) {
            results = await this.getLandByLocationAcresOwnerSuitability(zip, acres, owner, suitable);
        } else if (zip === undefined) {
            results = await this.getLandByIdAcresOwnerSuitability(id, acres, owner, suitable);
        } else if (acres === undefined) {
            results = await this.getLandByIdLocationOwnerSuitability(id, zip, owner, suitable);
        } else if (owner === undefined) {
            results = await this.getLandByIdLocationAcresSuitability(id, zip, acres, suitable);
        } else if (suitable === undefined) {
            results = await this.getLandByIdLocationAcresOwner(id, zip, acres, suitable);
        } else {
            results = await this.getLandByAll(id, zip, acres, owner, suitable);
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

    async getLandByLocation(zip) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE zip = ?", [zip]);
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

    async getLandByIdLocation(id, zip) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND zip = ?", [id, zip]);
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

    async getLandByLocationAcres(zip, acres) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE zip = ? AND acres = ?", [zip, acres]);
        return results;
    }

    async getLandByLocationOwner(zip, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE zip = ? AND owner = ?", [zip, owner]);
        return results;
    }

    async getLandByLocationSuitability(zip, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE zip = ? AND suitability = ?", [zip, suitable]);
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

    async getLandByIdLocationAcres(id, zip, acres) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND zip = ? AND acres = ?", [id, zip, acres]);
        return results;
    }

    async getLandbyIdLocationOwner(id, zip, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND zip = ? AND owner = ?", [id, zip, owner]);
        return results;
    }

    async getLandByIdLocationSuitability(id, zip, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND zip = ? AND suitability = ?", [id, zip, suitable]);
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

    async getLandByLocationAcresOwner(zip, acres, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE zip = ? AND acres = ? AND owner = ?", [zip, acres, owner]);
        return results;
    }

    async getLandByLocationAcresSuitability(zip, acres, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE zip = ? AND acres = ? AND suitability = ?", [zip, acres, suitable]);
        return results;
    }

    async getLandByLocationOwnerSuitability(zip, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE zip = ? AND owner = ? AND suitability = ?", [zip, owner, suitable]);
        return results;
    }

    async getLandByAcresOwnerSuitability(acres, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE acres = ? AND owner = ? AND suitability = ?", [acres, owner, suitable]);
        return results;
    }

    async getLandByIdLocationAcresOwner(id, zip, acres, owner) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND zip = ? AND acres = ? AND owner = ?", [id, zip, acres, owner]);
        return results;
    }

    async getLandByIdLocationAcresSuitability(id, zip, acres, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND zip = ? AND acres = ? AND suitability = ?", [id, zip, acres, suitable]);
        return results;
    }

    async getLandByIdLocationOwnerSuitability(id, zip, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND zip = ? AND owner = ? AND suitability = ?", [id, zip, owner, suitable]);
        return results;
    }

    async getLandByIdAcresOwnerSuitability(id, acres, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND acres = ? AND owner = ? AND suitability = ?", [id, acres, owner, suitable]);
        return results;
    }

    async getLandByLocationAcresOwnerSuitability(zip, acres, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE zip = ? AND acres = ? AND owner = ? AND suitable = ?", [zip, acres, owner, suitable]);
        return results;
    }

    async getLandByAll(id, zip, acres, owner, suitable) {
        const results = await this.DBQuery("SELECT * FROM Land WHERE ID = ? AND zip = ? AND acres = ? AND owner = ? AND suitability = ?", [id, zip, acres, owner, suitable]);
        return results;
    }
}

module.exports = land;