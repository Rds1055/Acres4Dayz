class review {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async fetchAllSpaces() {
        const results = await this.DBQuery("SELECT * FROM Review");
        return results;
    }

    async createNewReview(body) {
        
    }

    async getReviewsByLand(land) {
        const results = await this.DBQuery("SELECT * FROM Review WHERE land_id = ?", [land]);
        return results;
    }

    async getReviewsByReviewer(reviewer) {
        const results = await this.DBQuery("SELECT * FROM Review WHERE reviewer = ?", [reviewer])
    }
}

module.exports = review;