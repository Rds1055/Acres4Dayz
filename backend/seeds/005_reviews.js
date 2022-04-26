const random = require('../util/random-generator');

exports.seed = async function(knex) {
    const num = 150;
    const users = await knex('User');
    const lands = await knex('Land');
    const reviews = [];
    for (let i = 0; i < num; i++) {
        let index = Math.floor(Math.random() * Object.keys(lands).length);
        const land = lands[index].ID;
        const owner = lands[index].owner;
        index = Math.floor(Math.random() * Object.keys(users).length);
        let reviewer = users[index].username;
        while (reviewer === owner) {
            index = Math.floor(Math.random() * Object.keys(users).length);
            reviewer = users[index].username;
        }
        const review = random.review({ land_id: land, owner: owner, reviewer: reviewer });
        reviews.push(review);
    }
    // Then insert the bids
    await knex('Review').insert(reviews);
};