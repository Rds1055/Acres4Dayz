// Login to the database for knex
module.exports = {
    development: {
      client: 'mysql',
      debug: true,
      connection: {
        host : '127.0.0.1',
        port : 3306,
        user : 'root',
        password : 'DeclanRice41!',
        insecureAuth: true,
        database : 'acres_tables'
      }
    }
  };
  