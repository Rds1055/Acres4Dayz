// clear out the db before loading in new values
exports.seed = async function(knex) {
    await knex('user').del();
    await knex('bid').del();
    await knex('contract').del();
    await knex('land').del();
    await knex('review').del();
  };