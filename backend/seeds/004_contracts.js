const random = require('../utils/random-generator');


exports.seed = async function(knex) {
    const owners = await knex('users').limit(5);
    const renters = await knex('users').limit(5);
    const lands = await knex('lands').limit(5);

    const contracts = owners.map(
        (user) => {
      return random.contracts({ owner: user.username });
    });

    contracts = renters.map(
        (user) => {
      return random.contracts({ renter: user.username });
    });

    contracts = lands.map(
        (land) => {
      return random.contracts({ land_id: land.ID });
    });
    // Then insert the bids
    await knex('contracts').insert(contracts);
};