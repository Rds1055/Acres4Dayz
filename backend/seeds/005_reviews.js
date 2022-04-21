const random = require('../utils/random-generator');


exports.seed = async function(knex) {
    const reviewers = await knex('users').limit(5);
    const lands = await knex('lands').limit(5);

    const reviews = reviewers.map(
        (user) => {
      return random.reviews({ reviewers: user.username });
    });

    reviews = lands.map(
        (land) => {
      return random.reviews({ land_id: land.ID });
    });
    // Then insert the bids
    await knex('reviews').insert(reviews);
};