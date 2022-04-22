const random = require('../utils/random-generator');


exports.seed = async function(knex) {
    const num = 5;
    const users = await knex('User');
    const lands = await knex('Land');
    const reviews = [];
    for (let i = 0; i < num; i++) {
        let index = Math.floor(Math.random() * lands.length());
        const land = lands[index].id;
        const owner = lands[index].owner;
        index = Math.floor(Math.random() * users.length());
        let reviewer = users[index].username;
        while (renter === owner) {
            index = Math.floor(Math.random() * users.length());
            reviewer = users[index].username;
        }
        const review = random.contract({ land_id: land, owner: owner, reviewer: reviewer });
        reviews.push(review);
    }
    // Then insert the bids
    await knex('Review').insert(reviews);
};