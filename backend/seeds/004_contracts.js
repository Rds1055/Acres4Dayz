const random = require('../util/random-generator');

exports.seed = async function(knex) {
    const num = 50;
    const users = await knex('User');
    const lands = await knex('Land');
    const contracts = [];
    for (let i = 0; i < num; i++) {
        let index = Math.floor(Math.random() * Object.keys(lands).length);
        const land = lands[index].ID;
        index = Math.floor(Math.random() * Object.keys(users).length);
        let renter = users[index].username;
        while (renter === lands[index].owner) {
            index = Math.floor(Math.random() * Object.keys(users).length);
            renter = users[index].username;
        }
        const contract = random.contract({ land_id: land, renter: renter });
        contracts.push(contract);
    }

    // Then insert the bids
    await knex('Contract').insert(contracts);
};