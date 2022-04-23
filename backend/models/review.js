class review {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }
    
    async createReview(body) {
        const land = body.land;
        const owner = body.owner;
        const reviewer = body.reviewer;
        const rating = body.rating;
        const contents = body.contents;

        const result = await this.DBQuery("INSERT INTO Review(land_id, owner, reviewer, rating, contents) VALUES (?,?,?,?)", [land, owner, reviewer, rating, contents]);
        const newRecord = await this.DBQuery("SELECT * FROM Review WHERE ID = ?", [result.insertId]);
        return newRecord;
    }

    async getAllReviews() {
        const results = await this.DBQuery("SELECT * FROM Review");
        return results;
    }

    async getReviewsByLand(land) {
        const results = await this.DBQuery("SELECT * FROM Review WHERE land_id = ?", [land]);
        return results;
    }

    async getReviewsByOwner(owner) {
        const results = await this.DBQuery("SELECT * FROM Review WHERE owner = ?", [owner]);
        return results;
    }

    async getReviewsByReviewer(reviewer) {
        const results = await this.DBQuery("SELECT * FROM Review WHERE reviewer = ?", [reviewer]);
        return results;
    }
}

module.exports = review;