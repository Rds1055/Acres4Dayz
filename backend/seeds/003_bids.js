exports.seed = async function(knex) {
    // Use knex to load 5 users
    const owners = await knex('users').limit(5);
    const bidders = await knex('users').limit(5);
    const lands = await knex('lands').limit(5);

    const bids = owners.map(
        (user) => {
      return random.bids({ owner: user.username });
    });

    bids = bidders.map(
        (user) => {
      return random.bids({ top_bidder: user.username });
    });

    bids = lands.map(
        (land) => {
      return random.bids({ land_id: land.ID });
    });
    // Then insert the bids
    await knex('bids').insert(bids);

};