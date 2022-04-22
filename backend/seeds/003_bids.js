exports.seed = async function(knex) {
    const num = 5;
    const users = await knex('User');
    const lands = await knex('Land');
    const bids = [];
    for (let i = 0; i < num; i++) {
        let index = Math.floor(Math.random() * lands.length());
        const land = lands[index].id;
        const owner = lands[index].owner;
        index = Math.floor(Math.random() * users.length());
        let renter = users[index].username;
        while (renter === owner) {
            index = Math.floor(Math.random() * users.length());
            renter = users[index].username;
        }
        const bid = random.bid({ land_id: land, owner: owner, renter: renter });
        bids.push(bid);
    }
    // Then insert the bids
    await knex('Bid').insert(bids);

};