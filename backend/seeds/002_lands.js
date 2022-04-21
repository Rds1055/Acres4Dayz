const random = require('../utils/random-generator');


exports.seed = async function(knex) {
    // Use knex to load 5 users
    const users = await knex('users').limit(5);

    // Map through each user, and generate a random student record with that user's email
    const lands = users.map((user) => {
      return random.lands({ owner: user.username });
    });

    // Then insert the five students we generated
    await knex('lands').insert(lands);
};