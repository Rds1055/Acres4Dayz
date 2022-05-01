const random = require('../util/random-generator');

exports.seed = async function(knex) {
    const users = await knex('User');
    const num = 100;
    const lands = [];
    for (let i = 0; i < num; i++) {
        const index = Math.floor(Math.random() * Object.keys(users).length);
        const owner = users[index].username;
        const land = random.land(({ owner: owner }));
        lands.push(land);
    }

    // Then insert the five students we generated
    await knex('Land').insert(lands);
};