class review {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }
    
    async createReview(body) {
        const id = body.ID;
        const land = body.land_id;
        const reviewer = body.reviewer;
        const rating = body.rating;
        const contents = body.contents;

        let result;
        if (id === undefined) {
            result = await this.DBQuery("INSERT INTO Review(land_id, reviewer, rating, contents) VALUES (?,?,?,?, ?)", [land, reviewer, rating, contents]);
        } else {
            result = await this.DBQuery("INSERT INTO Review(ID, land_id, reviewer, rating, contents) VALUES (?, ?,?,?,?, ?)", [id, land, reviewer, rating, contents]);
        }
        const newRecord = await this.DBQuery("SELECT * FROM Review WHERE ID = ?", [result.insertId]);
        return newRecord;
    }

    async getAllReviews() {
        const results = await this.DBQuery("SELECT * FROM Review");
        return results;
    }

    async getReviewsById(id) {
        const results = await this.DBQuery("SELECT * FROM Review WHERE ID = ?", [id]);
        return results;
    }

    async getReviewsByLand(land) {
        const results = await this.DBQuery("SELECT * FROM Review WHERE land_id = ?", [land]);
        return results;
    }

    async getReviewsByOwner(owner) {
        const results = await this.DBQuery("SELECT Review.* FROM Review JOIN Land ON Review.land_id = Land.ID WHERE Land.owner = ?", [owner]);
        return results;
    }

    async getReviewsByReviewer(reviewer) {
        const results = await this.DBQuery("SELECT * FROM Review WHERE reviewer = ?", [reviewer]);
        return results;
    }
}

module.exports = review;