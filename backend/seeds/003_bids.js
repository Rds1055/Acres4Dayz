const random = require('../util/random-generator');

exports.seed = async function(knex) {
    const num = 100;
    const users = await knex('User');
    const lands = await knex('Land');
    const bids = [];
    for (let i = 0; i < num; i++) {
        let index = Math.floor(Math.random() * Object.keys(lands).length);
        const land = lands[index].ID;
        index = Math.floor(Math.random() * Object.keys(users).length);
        let bidder = users[index].username;
        while (bidder === lands[index].owner) {
            index = Math.floor(Math.random() * Object.keys(users).length);
            bidder = users[index].username;
        }
        const bid = random.bid({ land_id: land, top_bidder: bidder });
        bids.push(bid);
    }
    // Then insert the bids
    await knex('Bid').insert(bids);

};