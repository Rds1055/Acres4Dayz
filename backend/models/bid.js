class bid {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async getAllBids () {
        const results = await this.DBQuery("SELECT * FROM Bid");
        return results;
    }

    async createBid(body) {
        const land = body.land;
        const bid = body.bid;
        const bidder = body.bidder;

        const result = await this.DBQuery("INSERT INTO Bid(land_id, top_bid, top_bidder) VALUES (?,?,?,?)", [land, bid, bidder]);
        const newRecord = await this.DBQuery("SELECT * FROM Bid WHERE ID = ?", [result.insertId]);
        return newRecord;
    }

    async updateBid(id, body) {
        const bid = body.bid;
        const bidder = body.bidder;

        const result = await this.DBQuery("UPDATE Bid SET top_bid = ? WHERE ID = ?", [bid, id]);
        const result2 = await this.DBQuery("UPDATE Bid SET top_bidder = ? WHERE ID = ?", [bidder, id]);
        const newRecord = await this.DBQuery("SELECT * FROM Bid WHERE ID = ?", [id]);
        return newRecord;
    }

    async getBidsById(id) {
        const results = await this.DBQuery("SELECT * FROM Bid WHERE ID = ?", [id]);
        return results;
    }

    async getBidsByOwner(owner) {
        const results = await this.DBQuery("SELECT Bid.* FROM Bid JOIN Land ON Bid.land_id = Land.ID WHERE Land.owner = ?", [owner]);
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