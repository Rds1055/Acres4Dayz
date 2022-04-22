const random = require('../utils/random-generator');


exports.seed = async function(knex) {
    const num = 5;
    const users = await knex('users');
    const lands = await knex('lands');
    const contracts = [];
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
        const contract = random.contract({ land_id: land, owner: owner, renter: renter });
        contracts.push(contract);
    }

    // Then insert the bids
    await knex('Contract').insert(contracts);
};