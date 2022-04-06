class contract {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async fetchAllSpaces() {
        const results = await this.DBQuery("SELECT * FROM Contract");
        return results;
    }

    async createNewContract(body) {

    }

    async getContractsByOwner(owner) {
        const results = await this.DBQuery("SELECT * FROM Contract WHERE owner = ?", [owner]);
        return results;
    }

    async getContractsByRenter(renter) {
        const results = await this.DBQuery("SELECT * FROM Contract WHERE renter = ?", [renter]);
        return results;
    }
}

module.exports = contract;