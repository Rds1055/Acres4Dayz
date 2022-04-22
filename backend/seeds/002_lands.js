const random = require('../utils/random-generator');


exports.seed = async function(knex) {
    // Use knex to load 5 users
    const users = await knex('User').limit(5);

    // Map through each user, and generate a random student record with that user's email
    const lands = users.map((user) => {
      return random.land({ owner: user.username });
    });

    // Then insert the five students we generated
    await knex('Land').insert(lands);
};