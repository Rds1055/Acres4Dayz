class bid {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async fetchAllSpaces () {
        const results = await this.DBQuery("SELECT * FROM Bid");
        return results;
    }

    async createBid(body) {

    }

    async updateBid(body) {

    }

    async getBidsByOwner(owner) {
        const results = await this.DBQuery("SELECT * FROM Bid WHERE owner = ?", [owner]);
        return results;
    }

    async getBidsByBidder(bidder) {
        const results = await this.DBQuery("SELECT * FROM Bid WHERE top_bidder = ?", [bidder]);
        return results;
    }

    async getBidsByLand(land) {
        const results = await this.DBQuery("SELECT * FROM Bid WHERE land_id = ?", [land]);
        return results;
    }
}

module.exports = bid;